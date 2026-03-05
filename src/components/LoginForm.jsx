import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth/authSlice";
import loginBg from "../assets/login-bg.jpg";
import { FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setError("");
    dispatch(login(username));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-slate-800 via-slate-900 to-black px-6">
      <div className="grid md:grid-cols-2 max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* LEFT SIDE */}
        <div
          className="hidden md:flex flex-col justify-center items-start text-white p-12 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Create your Account</h2>
            <p className="text-sm opacity-90 max-w-sm leading-relaxed">
              Discover movies, explore ratings and build your personal watchlist
              with MovieFinder.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center p-16">
          <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-sm text-center text-gray-500 mb-8">
            Login to continue exploring movies
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div
              className={`flex items-center border rounded-lg px-4 py-3 transition duration-200
              ${
                error
                  ? "border-red-500 focus-within:ring-red-500"
                  : "border-gray-300 focus-within:ring-blue-500 focus-within:border-blue-500"
              }`}
            >
              <FaUser className="text-gray-400 mr-3 text-sm" />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gray-800 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-gray-700 active:scale-[0.98] transition duration-200 shadow-md"
            >
              <FiLogIn />
              Login
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-10">
            MovieFinder • React + Redux Toolkit
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
