const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const apiLimiter = require("./middlewares/rateLimitMiddleware");
const { errorHandler } = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();

// Connect to database
if (process.env.NODE_ENV !== "test") {
  connectDB(process.env.MONGO_URI);
}
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/vendors", apiLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
