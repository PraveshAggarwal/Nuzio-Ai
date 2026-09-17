import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("MongoDB URI not provided. Running in memory/mock mode.");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.warn("MongoDB connection warning (check IP whitelist on Atlas):", err.message);
  }
};

export default connectDB;
