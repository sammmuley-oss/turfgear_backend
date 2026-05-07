import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TIMEOUT = 15000;

// ─── Axios Instance ───
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ───
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('turfgear_admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Response Interceptor ───
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem('turfgear_admin_token');
        window.location.href = '/login';
      }

      if (status === 403) {
        console.error('[API] Forbidden — insufficient permissions');
      }

      if (status >= 500) {
        console.error('[API] Server error:', error.response.data);
      }
    } else if (error.request) {
      console.error('[API] Network error — no response received');
    }

    return Promise.reject(error);
  }
);

export default api;
