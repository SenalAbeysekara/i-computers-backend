import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // auto delete after 120 seconds = 2 minutes
  },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;