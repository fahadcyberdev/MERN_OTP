import express from "express";
import {
  registerUser,
  verifyOTP,
  loginUser,
  resendOTP, // ✅ import the new controller function
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);

// ✅ New route for resending OTP
router.post("/resend-otp", resendOTP);

export default router;
