const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
