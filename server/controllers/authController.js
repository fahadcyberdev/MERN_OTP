import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// =========================
// Register user and send OTP
// =========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user = new User({ name, email, password: hashedPassword, otp, otpExpires });
    await user.save();

    await sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);
    res.status(201).json({ msg: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// =========================
// Verify OTP
// =========================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ msg: "Account verified", token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// =========================
// Login user
// =========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Please verify your email first" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// =========================
// Resend OTP
// =========================
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ msg: "User already verified" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(email, "OTP Verification", `Your new OTP is: ${otp}`);
    res.json({ msg: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
