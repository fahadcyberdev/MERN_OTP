import React from "react";
import { useState } from "react";

export default function OTPInput({ length = 6, onChangeOTP }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      onChangeOTP(updated.join(""));
      // Auto focus next input
      if (value && index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          id={`otp-input-${idx}`}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          maxLength="1"
          className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      ))}
    </div>
  );
}
