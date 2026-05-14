const multer = require("multer");

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  let message = error.message || "Terjadi kesalahan pada server";
  let responseStatus = statusCode;

  if (error.code === "P2002") {
    responseStatus = 400;
    const target = Array.isArray(error.meta && error.meta.target)
      ? error.meta.target.join(", ")
      : "field";
    message = target.includes("email") ? "Email sudah digunakan" : `${target} sudah digunakan`;
  }

  if (error.code === "P2025") {
    responseStatus = 404;
    message = "Data tidak ditemukan";
  }

  if (error instanceof multer.MulterError) {
    responseStatus = 400;
    message = error.code === "LIMIT_FILE_SIZE" ? "Ukuran file maksimal 2MB" : error.message;
  }

  return res.status(responseStatus).json({
    success: false,
    message,
    errors: error.errors || [],
  });
};

module.exports = errorMiddleware;
