const requestLogger = (req, res, next) => {
  const startedAt = Date.now();
  console.log("[API REQUEST]", {
    method: req.method,
    path: req.originalUrl,
    query: req.query,
    body: req.is("multipart/form-data") ? "[multipart/form-data]" : req.body,
  });

  res.on("finish", () => {
    console.log("[API RESPONSE]", {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
};

module.exports = requestLogger;
