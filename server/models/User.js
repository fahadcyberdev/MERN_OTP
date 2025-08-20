import mongoose from "mongoose";

// This schema defines the structure of User documents in MongoDB
const userSchema = new mongoose.Schema({
  // User's name (required)
  name: { type: String, required: true },
  // User's email (required and must be unique)
  email: { type: String, required: true, unique: true },
  // User's password (required, will be stored as a hashed string)
  password: { type: String, required: true },
  // OTP code for email verification (optional)
  otp: { type: String },
  // Expiry time for OTP (optional)
  otpExpires: { type: Date },
  // Whether the user has verified their email (default: false)
  isVerified: { type: Boolean, default: false },
});

// Export the User model so you can use it in other files to interact with users collection
export default mongoose.model("User", userSchema);
