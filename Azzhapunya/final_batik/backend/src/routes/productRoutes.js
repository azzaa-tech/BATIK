const express = require("express");
const { body } = require("express-validator");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

const productValidation = [
  body("nama").notEmpty().withMessage("Nama produk wajib diisi"),
  body("deskripsi").notEmpty().withMessage("Deskripsi produk wajib diisi"),
  body("harga").isInt({ min: 0 }).withMessage("Harga harus berupa angka minimal 0"),
  body("stok").isInt({ min: 0 }).withMessage("Stok harus berupa angka minimal 0"),
  body("kategori").isIn(["Pria", "Wanita"]).withMessage("Kategori harus Pria atau Wanita"),
  body("gambar").notEmpty().withMessage("Gambar produk wajib diisi"),
];

const productUpdateValidation = [
  body("nama").optional().notEmpty().withMessage("Nama produk tidak boleh kosong"),
  body("deskripsi").optional().notEmpty().withMessage("Deskripsi produk tidak boleh kosong"),
  body("harga").optional().isInt({ min: 0 }).withMessage("Harga harus berupa angka minimal 0"),
  body("stok").optional().isInt({ min: 0 }).withMessage("Stok harus berupa angka minimal 0"),
  body("kategori").optional().isIn(["Pria", "Wanita"]).withMessage("Kategori harus Pria atau Wanita"),
  body("gambar").optional().notEmpty().withMessage("Gambar produk tidak boleh kosong"),
];

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", authMiddleware, adminMiddleware, productValidation, createProduct);
router.put("/products/:id", authMiddleware, adminMiddleware, productUpdateValidation, updateProduct);
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
