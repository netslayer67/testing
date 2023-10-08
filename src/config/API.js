import axios from 'axios';

export const API = axios.create();
export const MultipartAPI = axios.create();
const baseURL = import.meta.env.VITE_API_BASE_URL;

API.interceptors.request.use(
    async (config) => {
        const value = await localStorage.getItem('token');
        const keys = JSON.parse(value);
        config.baseURL = baseURL;
        config.headers = {
            Authorization: `Bearer ${keys}`,
            'Content-Type': 'application/json',
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

MultipartAPI.interceptors.request.use(
  async (config) => {
    const value = await localStorage.getItem("token");
    const keys = JSON.parse(value);
    config.baseURL = baseURL
    config.headers = {
      Authorization: `Bearer ${keys}`,
      "Content-Type": "multipart/form-data",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);