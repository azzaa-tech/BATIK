require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const requestLogger = require("./middleware/requestLogger");
const { testConnection } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Gallery Batik Lontara API berjalan",
    data: null,
  });
});

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api/bookings", bookingRoutes)

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await testConnection();
    console.log("MySQL connection OK");
  } catch (error) {
    console.error("MySQL connection failed", error.message);
  }
});

module.exports = app;
