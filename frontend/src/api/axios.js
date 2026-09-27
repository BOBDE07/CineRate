import axios from 'axios';

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.trim()
  || 'https://cinerate-v3jb.onrender.com/api/v1';
const normalizedBaseURL = configuredBaseURL.replace(/\/+$/, '');

const api = axios.create({
  baseURL: normalizedBaseURL.endsWith('/api/v1')
    ? normalizedBaseURL
    : `${normalizedBaseURL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
