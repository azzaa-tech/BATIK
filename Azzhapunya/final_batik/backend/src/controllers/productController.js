const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const normalizeProductPayload = (body) => {
  const payload = { ...body };

  if (payload.harga !== undefined) {
    payload.harga = Number(payload.harga);
  }

  if (payload.stok !== undefined) {
    payload.stok = Number(payload.stok);
  }

  return payload;
};

const getAllProducts = async (req, res, next) => {
  try {
    const { kategori, search } = req.query;
    const where = {};

    if (kategori) {
      where.kategori = kategori;
    }

    if (search) {
      where.OR = [
        { nama: { contains: search } },
        { deskripsi: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const product = await prisma.product.create({
      data: normalizeProductPayload(req.body),
    });

    return res.status(201).json({
      success: true,
      message: "Produk berhasil dibuat",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: normalizeProductPayload(req.body),
    });

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    return res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
