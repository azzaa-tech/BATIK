const { validationResult } = require("express-validator");
const prisma = require("../utils/prisma");

const getOrCreateCart = async (userId) => {
  const existingCart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (existingCart) {
    return existingCart;
  }

  return prisma.cart.create({
    data: { userId },
  });
};

const getCartWithItems = async (userId) => {
  return prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

const getCart = async (req, res, next) => {
  try {
    const cart = await getCartWithItems(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Keranjang berhasil diambil",
      data: cart || { userId: req.user.id, items: [] },
    });
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const { productId, qty, size } = req.body;
    console.log("[CART ADD]", { userId: req.user.id, productId, qty, size });
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
        errors: [],
      });
    }

    const cart = await getOrCreateCart(req.user.id);
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
        size,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty: existingItem.qty + Number(qty) },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          qty: Number(qty),
          size,
        },
      });
    }
    console.log("[CART SAVED]", { userId: req.user.id, productId, qty, size });

    const updatedCart = await getCartWithItems(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Produk berhasil ditambahkan ke keranjang",
      data: updatedCart,
    });
  } catch (error) {
    return next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const cart = await getCartWithItems(req.user.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan",
        errors: [],
      });
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        id: Number(req.params.itemId),
        cartId: cart.id,
      },
      include: { product: true },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item keranjang tidak ditemukan",
        errors: [],
      });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: item.id },
      data: { qty: Number(req.body.qty) },
      include: { product: true },
    });

    return res.status(200).json({
      success: true,
      message: "Item keranjang berhasil diperbarui",
      data: updatedItem,
    });
  } catch (error) {
    return next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const cart = await getCartWithItems(req.user.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan",
        errors: [],
      });
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        id: Number(req.params.itemId),
        cartId: cart.id,
      },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item keranjang tidak ditemukan",
        errors: [],
      });
    }

    await prisma.cartItem.delete({
      where: { id: item.id },
    });

    return res.status(200).json({
      success: true,
      message: "Item keranjang berhasil dihapus",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: req.user.id },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Keranjang berhasil dikosongkan",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

const applyPromo = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const promo = await prisma.promoCode.findUnique({
      where: { kode: String(req.body.kode).trim().toUpperCase() },
    });

    if (!promo || !promo.aktif) {
      return res.status(404).json({
        success: false,
        message: "Kode promo tidak valid atau tidak aktif",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Kode promo berhasil digunakan",
      data: {
        diskon: promo.diskon,
        message: `Diskon ${promo.diskon * 100}% berhasil diterapkan`,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyPromo,
};
