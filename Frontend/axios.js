import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Automatically attach the Bearer token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle common response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized. Please log in again.");
          break;

        case 403:
          console.error("Access denied.");
          break;

        case 404:
          console.error("API endpoint not found.");
          break;

        case 500:
          console.error("Internal server error.");
          break;

        default:
          console.error(error.response.data);
      }
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;