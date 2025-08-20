import { useState } from "react";

export default function OTPInput({ length = 6, onChangeOTP }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      onChangeOTP(updated.join(""));
    }
  };

  return (
    <div className="flex justify-between">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          maxLength="1"
          className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-lg bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
        />
      ))}
    </div>
  );
}
