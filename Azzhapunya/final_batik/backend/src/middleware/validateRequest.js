const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("[VALIDATION ERROR]", {
      path: req.originalUrl,
      errors: errors.array(),
      body: req.body,
    });

    return res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors: errors.array(),
    });
  }

  return next();
};

module.exports = validateRequest;
