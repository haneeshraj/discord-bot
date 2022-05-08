const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/butterboyDB"
    );
    console.log(`MongoDB connected : ${conn.connection.host}`.blue.bold);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
