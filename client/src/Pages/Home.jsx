import { FaHome, FaSignOutAlt } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <PageWrapper>
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 text-center">
        <FaHome className="text-4xl text-green-600 mx-auto mb-3" />
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Welcome Home 🎉
        </h2>
        <p className="text-gray-700 mb-4">
          You are successfully registered, verified OTP, and logged in.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition mx-auto"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </PageWrapper>
  );
}
