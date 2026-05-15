const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const prisma = require("../utils/prisma");

const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const { nama, email, password, noWa } = req.body;
    console.log("[AUTH REGISTER]", { nama, email, hasNoWa: Boolean(noWa) });
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah digunakan",
        errors: [],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        noWa,
      },
    });

    const data = {
      token: createToken(user),
      user: sanitizeUser(user),
    };

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    console.log("[AUTH LOGIN]", { email });
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
        errors: [],
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        token: createToken(user),
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profil berhasil diambil",
      data: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
