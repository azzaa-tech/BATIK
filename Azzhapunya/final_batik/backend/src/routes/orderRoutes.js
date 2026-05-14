const express = require("express");
const { body } = require("express-validator");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();

const orderValidation = [
  body("namaPenerima").notEmpty().withMessage("Nama penerima wajib diisi"),
  body("alamat").notEmpty().withMessage("Alamat wajib diisi"),
  body("telpon").notEmpty().withMessage("Telpon wajib diisi"),
  body("metodePembayaran").notEmpty().withMessage("Metode pembayaran wajib diisi"),
  body("subtotal").isInt({ min: 0 }).withMessage("Subtotal harus berupa angka minimal 0"),
  body("ongkir").isInt({ min: 0 }).withMessage("Ongkir harus berupa angka minimal 0"),
  body("total").isInt({ min: 0 }).withMessage("Total harus berupa angka minimal 0"),
  body("items").notEmpty().withMessage("Items wajib diisi"),
];

router.post("/orders", authMiddleware, uploadMiddleware, orderValidation, createOrder);
router.get("/orders", authMiddleware, getMyOrders);
router.get("/orders/:id", authMiddleware, getOrderById);
router.get("/admin/orders", authMiddleware, adminMiddleware, getAllOrders);
router.put(
  "/admin/orders/:id",
  authMiddleware,
  adminMiddleware,
  [body("status").isIn(["pending", "confirmed", "shipped", "done"]).withMessage("Status tidak valid")],
  updateOrderStatus
);

module.exports = router;
