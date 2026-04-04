import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`SUCCESS: MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("ERROR: MongoDB connection failed:", error.message);
    process.exit(1); // Exit if DB fails
  }
};

export default connectDB;