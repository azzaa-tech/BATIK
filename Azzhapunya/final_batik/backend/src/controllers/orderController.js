const { validationResult } = require("express-validator");
const prisma = require("../utils/prisma");
const { db } = require("../config/db");

const parseItems = (items) => {
  if (Array.isArray(items)) {
    return items;
  }

  if (typeof items === "string") {
    return JSON.parse(items);
  }

  return [];
};

const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Bukti transaksi wajib diunggah",
        errors: [],
      });
    }

    let parsedItems;

    try {
      parsedItems = parseItems(req.body.items);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Format items harus berupa JSON valid",
        errors: [error.message],
      });
    }

    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items pesanan wajib diisi",
        errors: [],
      });
    }

    const requiredItemFields = parsedItems.every((item) => {
      return (
        item.productId &&
        item.qty &&
        item.size &&
        item.harga !== undefined
      );
    });

    if (!requiredItemFields) {
      return res.status(400).json({
        success: false,
        message:
          "Setiap item wajib memiliki productId, qty, size, dan harga",
        errors: [],
      });
    }

    const invalidItems = parsedItems.filter((item) => {
      return (
        Number(item.productId) < 1 ||
        Number(item.qty) < 1 ||
        Number(item.harga) < 0
      );
    });

    if (invalidItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: "ProductId, qty, dan harga item harus valid",
        errors: invalidItems,
      });
    }

    const {
      namaPenerima,
      alamat,
      telpon,
      catatan,
      metodePembayaran,
      subtotal,
      diskon,
      ongkir,
      total,
    } = req.body;

    console.log("[ORDER CREATE]", {
      userId: req.user.id,
      itemCount: parsedItems.length,
      subtotal,
      diskon,
      ongkir,
      total,
    });

    const productIds = parsedItems.map((item) =>
      Number(item.productId)
    );

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        stok: true,
      },
    });

    if (products.length !== new Set(productIds).size) {
      return res.status(400).json({
        success: false,
        message:
          "Ada produk pesanan yang tidak ditemukan",
        errors: [],
      });
    }

    const stockByProductId = new Map(
      products.map((product) => [
        product.id,
        product.stok,
      ])
    );

    const outOfStockItems = parsedItems.filter((item) => {
      return (
        Number(item.qty) >
        (stockByProductId.get(
          Number(item.productId)
        ) || 0)
      );
    });

    if (outOfStockItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Stok produk tidak mencukupi",
        errors: outOfStockItems,
      });
    }

    const order = await prisma.$transaction(
      async (tx) => {
        const createdOrder = await tx.order.create({
          data: {
            userId: req.user.id,
            namaPenerima,
            alamat,
            telpon,
            catatan,
            metodePembayaran,

            subtotal: Number(subtotal),
            diskon: Number(diskon || 0),
            ongkir: Number(ongkir),
            total: Number(total),

            buktiTransaksi: `/uploads/bukti/${req.file.filename}`,

            items: {
              create: parsedItems.map((item) => ({
                productId: Number(item.productId),
                qty: Number(item.qty),
                size: item.size,
                harga: Number(item.harga),
              })),
            },
          },

          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

        for (const item of parsedItems) {
          await tx.product.update({
            where: {
              id: Number(item.productId),
            },

            data: {
              stok: {
                decrement: Number(item.qty),
              },
            },
          });
        }

        const cart = await tx.cart.findFirst({
          where: {
            userId: req.user.id,
          },
        });

        if (cart) {
          await tx.cartItem.deleteMany({
            where: {
              cartId: cart.id,
            },
          });
        }

        return createdOrder;
      }
    );

    return res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Pesanan berhasil diambil",
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail pesanan berhasil diambil",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { status } = req.query;

    const where = status ? { status } : {};

    const orders = await prisma.order.findMany({
      where,

      include: {
        user: {
          select: {
            id: true,
            nama: true,
            email: true,
            noWa: true,
            role: true,
            createdAt: true,
          },
        },

        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Semua pesanan berhasil diambil",
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const order = await prisma.order.update({
      where: {
        id: Number(req.params.id),
      },

      data: {
        status: req.body.status,
      },

      include: {
        user: {
          select: {
            id: true,
            nama: true,
            email: true,
            noWa: true,
            role: true,
            createdAt: true,
          },
        },

        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Status pesanan berhasil diperbarui",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};