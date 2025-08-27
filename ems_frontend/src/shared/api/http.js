import axios from "axios";
import { env } from "../config/env";

const http = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 10000,
});

// Request interceptor for JWT (add logic as needed)
http.interceptors.request.use((config) => {
  // Example: Add token from localStorage
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling (expand as needed)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401, refresh logic, etc.
    return Promise.reject(error);
  }
);

export default http;
