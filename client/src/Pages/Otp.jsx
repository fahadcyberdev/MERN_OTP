import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OTPInput from "../components/OTPInput";
import PageWrapper from "../components/PageWrapper";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import { MdVerified, MdOutlineReplay } from "react-icons/md";

export default function OTPVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleVerify = async () => {
    if (otp.length !== 6) return toast.error("Enter valid OTP");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg);
        navigate("/login");
      } else toast.error(data.msg || "OTP verification failed");
    } catch {
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP resent successfully!");
        setResendTimer(60);
        setCanResend(false);
      } else toast.error(data.msg || "Failed to resend OTP");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 text-center">
        <MdVerified className="text-4xl text-green-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <OTPInput length={6} onChangeOTP={setOtp} />

        <button
          onClick={handleVerify}
          className="mt-4 w-full bg-green-600 py-2 rounded-lg text-white hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* ✅ Resend OTP Section */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={handleResend}
            disabled={!canResend || loading}
            className={`flex items-center gap-1 text-sm font-semibold ${
              canResend
                ? "text-indigo-600 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <MdOutlineReplay />
            Resend OTP
          </button>
          {!canResend && (
            <span className="text-gray-500 text-sm">({resendTimer}s)</span>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
