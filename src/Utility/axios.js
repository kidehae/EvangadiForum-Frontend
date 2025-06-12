// axios.jsx
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2112',
  withCredentials: true
});

// Add interceptor to include token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
