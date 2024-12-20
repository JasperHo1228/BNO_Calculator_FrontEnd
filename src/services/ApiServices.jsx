import axios from "axios";


const baseURLbeforLogin = "http://localhost:8080/api";
const baseURLafterLogin = "http://localhost:8080/api/user";

export const beforeLoginApi = axios.create({
    baseURL: baseURLbeforLogin
  });
  

export const afterLoginApi = axios.create({
    baseURL: baseURLafterLogin
  });


  export const beforeLoginGetParamApi = async (endpoint, token) => {
    try {
      const response = await beforeLoginApi.get(endpoint, {
        params: { token }, // Pass token as a query parameter
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
      params: { email }, // Pass email as a query parameter
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


  export const afterLoginPostParamApi = async (endpoint, customHeaders = {}, start_date, end_date) => {
    try {
      const response = await afterLoginApi.post(endpoint, null, {
        headers: { ...customHeaders },
        params: { start_date, end_date }, 
      });
      return response.data; 
    } catch (error) {
      console.error("API call failed:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const afterLoginDeleteParamApi = async (endpoint, customHeaders = {}, id) => {
    try {
        const response = await afterLoginApi.delete(endpoint, {
            headers: { ...customHeaders },
            params: { id }, // Ensure id is being sent as a parameter
        });
        return response.data; 
    } catch (error) {
        console.error("API call failed:", error.response?.data || error.message);
        throw error;
    }
};