import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('stocksense_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('stocksense_token');
      localStorage.removeItem('stocksense_user');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.startsWith('/login') &&
          !window.location.pathname.startsWith('/signup') &&
          !window.location.pathname.startsWith('/forgot-password') &&
          !window.location.pathname.startsWith('/verify-otp') &&
          !window.location.pathname.startsWith('/reset-password')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
