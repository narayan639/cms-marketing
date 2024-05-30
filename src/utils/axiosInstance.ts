// src/utils/axiosInstance.ts

import axios from 'axios';
import { getToken } from '@/app/apiconnect/formhandler';

const axiosInstance = axios.create({
  baseURL: process.env.DOMAIN, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error)

    if (error.response.status === 403 &&!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`/api/user/refreshtoken`,{
            withCredentials: true
        })
        return axiosInstance.request(originalRequest);     
     } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
