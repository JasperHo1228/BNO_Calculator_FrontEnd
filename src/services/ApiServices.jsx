import axios from "axios";

const baseURLbeforLogin = "http://localhost:8080/api";
const baseURLafterLogin = "http://localhost:8080/api/user";

export const beforeLoginApi = axios.create({
  baseURL: baseURLbeforLogin,
  headers: {
    "Content-Type": "application/json",
  },
});

export const afterLoginApi = axios.create({
  baseURL: baseURLafterLogin,
  headers: {
    "Content-Type": "application/json",
  },
});


// Attach token to requests
afterLoginApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 + refresh logic
afterLoginApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token might be expired. Attempting refresh...");
      try {
        const oldToken = localStorage.getItem("token");
        const refreshResponse = await axios.post(
          `${baseURLbeforLogin}/refresh-token`,
          null,
          { params: { token: oldToken } }
        );
        const newToken = refreshResponse.data.token;
        localStorage.setItem("token", newToken);

        // Retry original request with new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return afterLoginApi.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export const beforeLoginGetParamApi = async (endpoint, token) => {
  try {
    const response = await beforeLoginApi.get(endpoint, {
      params: { token },
    });
    return response;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export const beforeLoginPostParamApi = async (endpoint, email) => {
  try {
    const response = await beforeLoginApi.post(endpoint, null, {
      params: { email },
    });
    return response;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export const beforeLoginPostApi = async (endpoint, data, customHeaders = {}) => {
  try {
    const response = await beforeLoginApi.post(endpoint, data, {
      headers: { ...customHeaders },
    });
    return response;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export const afterLoginGetApi = async (endpoint) => {
  try {
    const response = await afterLoginApi.get(endpoint);
    return response;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export const afterLoginPostApi = async (endpoint, data) => {
  try {
    const response = await afterLoginApi.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export const afterLoginPostParamApi = async (endpoint, start_date, end_date) => {
  try {
    const response = await afterLoginApi.post(endpoint, null, {
      params: { start_date, end_date },
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export const afterLoginDeleteParamApi = async (endpoint, id) => {
  try {
    const response = await afterLoginApi.delete(endpoint, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};
