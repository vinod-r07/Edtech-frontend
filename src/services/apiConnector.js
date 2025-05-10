import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
      }
});

export const apiConnector = async (method, url, data, headers, params) => {
    const mergedHeaders = {
      ...axiosInstance.defaults.headers.common, // default headers
      ...headers // custom headers override or add to defaults
    };
  
    return axiosInstance({
      method,
      url,
      data,
      headers: mergedHeaders,
      params
    });
  };
  