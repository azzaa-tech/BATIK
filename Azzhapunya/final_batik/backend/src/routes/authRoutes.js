const express = require("express");
const { body } = require("express-validator");
const { register, login, getProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/auth/register",
  [
    body("nama").notEmpty().withMessage("Nama wajib diisi"),
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
  ],
  register
);

router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").notEmpty().withMessage("Password wajib diisi"),
  ],
  login
);

router.get("/auth/profile", authMiddleware, getProfile);

module.exports = router;
