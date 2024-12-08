import axios from "axios";

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


export const beforeLoginPostApi = async (endpoint, data, customHeaders = {}) => {
    try {
      const response = await api.post(endpoint, data, {
        headers: { ...customHeaders },
      });
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
  
  export const beforeLoginGetApi = async (endpoint, data, customHeaders = {}) => {
    try {
      const response = await afterLoginApi.get(endpoint, data, {
        headers: { ...customHeaders },
      });
      return response;
    } 
    catch (error) {
      throw error;
    }
  };


  export const afterLoginPostApi = async (endpoint, data, customHeaders = {}) => {
    try {
      const response = await afterLoginApi.post(endpoint, data, {
        headers: { ...customHeaders },
      });
      return response; // Return only the data for simplicity
    } 
    catch (error) {
      throw error;
    }
  };


  export const afterLoginGetApi = async (endpoint, customHeaders = {}) => {
    try {
      const response = await afterLoginApi.get(endpoint, {
        headers: { ...customHeaders },
      });
      return response;
    } 
    catch (error) {
      throw error;
    }
  };


