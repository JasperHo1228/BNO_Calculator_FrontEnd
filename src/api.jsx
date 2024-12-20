import axios from "axios";

// Base API instance for unauthenticated requests
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Authenticated API instance
const afterLoginApi = axios.create({
  baseURL: "http://localhost:8080/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});


export { api, afterLoginApi };
