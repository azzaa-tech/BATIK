const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

const authMiddleware = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
        errors: [],
      });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid",
      errors: [error.message],
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Akses hanya untuk admin",
      errors: [],
    });
  }

  return next();
};

const optionalAuthMiddleware = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      req.user = null;
      return next();
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    req.user = null;
    return next();
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  optionalAuthMiddleware,
};
