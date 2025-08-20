import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";
import { API_URL } from "../config";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg);
        navigate("/verify", { state: { email } });
      } else toast.error(data.msg || "Registration failed");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 flex flex-col items-center">
        <FaUserPlus className="text-4xl text-indigo-600 mb-3" />
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Register</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none backdrop-blur-sm bg-white/20"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none backdrop-blur-sm bg-white/20"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none backdrop-blur-sm bg-white/20"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* ✅ New Login link */}
        <p className="text-gray-700 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}
