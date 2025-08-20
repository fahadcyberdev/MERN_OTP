import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast notification on success
    toast.success("Registration & OTP verification successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <>
      {/* Toast container to show notifications */}
      <ToastContainer />
      {/* You can add a simple message or animation here if you want */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
        <p className="text-gray-700">Redirecting to home...</p>
      </div>
    </>
  );
}