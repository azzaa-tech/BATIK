const express = require("express");
const { body } = require("express-validator");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyPromo,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/cart", authMiddleware, getCart);
router.post(
  "/cart",
  authMiddleware,
  [
    body("productId").isInt({ min: 1 }).withMessage("ProductId wajib berupa angka"),
    body("qty").isInt({ min: 1 }).withMessage("Qty minimal 1"),
    body("size").notEmpty().withMessage("Size wajib diisi"),
  ],
  addToCart
);
router.put(
  "/cart/:itemId",
  authMiddleware,
  [body("qty").isInt({ min: 1 }).withMessage("Qty minimal 1")],
  updateCartItem
);
router.delete("/cart/:itemId", authMiddleware, removeCartItem);
router.delete("/cart", authMiddleware, clearCart);
router.post(
  "/cart/promo",
  [body("kode").notEmpty().withMessage("Kode promo wajib diisi")],
  applyPromo
);

module.exports = router;
