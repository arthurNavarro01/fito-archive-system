import axios from "axios";
import type { AxiosRequestHeaders } from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

// Interceptor para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    (config.headers as AxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
  }
  return config;
}); 