import axios from "axios";

// Base API instance for unauthenticated requests
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Authenticated API instance
const afterLoginApi = axios.create({
  baseURL: "http://localhost:8080/api/user",
});

// Add an interceptor to `afterLoginApi` for Basic Authentication
afterLoginApi.interceptors.request.use(
  (config) => {
    // Retrieve credentials (username and password) from localStorage or another storage mechanism
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      // Set the Authorization header
      config.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export { api, afterLoginApi };
