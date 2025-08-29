import http from "../shared/api/http";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/model/authSlice.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await http.post(
        "/employee/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          loginSuccess({ user: res.data.employee, token: res.data.token })
        );
        localStorage.setItem("token", res.data.token);

        if (res.data.employee.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        dispatch(loginFailure(res.data.error || "Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Backend response:", error.response);
        console.error("Backend data:", error.response.data);
        console.error("Backend status:", error.response.status);
        console.error("Backend headers:", error.response.headers);
      }
      dispatch(loginFailure(error.response?.data?.error || "Server Error!"));
    }
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "linear-gradient(to bottom, #8399a2, #eef2f3)" }}>
      {/* Left side - Header */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-sm">
            Employee Management System
          </h2>
          <p className="text-xl text-gray-700 opacity-90">
            Streamline your workforce management
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form
          className="border-1 backdrop-blur-sm rounded-3xl shadow-xl p-8 w-full max-w-md hover:shadow-2xl transition-all duration-300 hover:scale-105"
          style={{
            borderColor: "#8399a2",
            backgroundColor: "rgba(238, 242, 243, 0.85)",
          }}
          onSubmit={handleSubmit}
          method="POST">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
              <div
                className="w-20 h-1 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(to right, #8399a2, #6b7c85)",
                }}></div>
            </div>

            {error && <p className="text-red-400">{error}</p>}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                style={{
                  backgroundColor: "rgba(238, 242, 243, 0.7)",
                  borderColor: "#8399a2",
                  "--tw-ring-color": "#8399a2",
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                style={{
                  backgroundColor: "rgba(238, 242, 243, 0.7)",
                  borderColor: "#8399a2",
                  "--tw-ring-color": "#8399a2",
                }}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded focus:ring-2"
                  style={{
                    color: "#8399a2",
                    backgroundColor: "rgba(238, 242, 243, 0.7)",
                    borderColor: "#8399a2",
                    "--tw-ring-color": "#8399a2",
                  }}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm hover:underline transition-colors duration-200"
                style={{ color: "#8399a2" }}
                onMouseEnter={(e) => (e.target.style.color = "#6b7c85")}
                onMouseLeave={(e) => (e.target.style.color = "#8399a2")}>
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-200 active:scale-95"
              style={{
                background: "linear-gradient(to right, #8399a2, #6b7c85)",
                "--tw-ring-color": "#8399a2",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #6b7c85, #5a6c75)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #8399a2, #6b7c85)")
              }>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
