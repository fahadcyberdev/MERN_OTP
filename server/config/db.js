import mongoose from "mongoose";

// This function connects your app to MongoDB using the URI from .env file
const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    // If connection fails, log the error and stop the server
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB; // Export the function so it can be used in other
