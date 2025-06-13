import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      delete api.defaults.headers.common['x-auth-token'];
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'An error occurred';
    return Promise.reject({ message: errorMessage });
  }
);

export const fetchDevices = async () => {
  try {
    const data = await api.get('/devices');
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const triggerDeviceSync = async (deviceId) => {
  try {
    const data = await api.post(`/devices/${deviceId}/sync`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const fetchErrorLogs = async () => {
  try {
    const data = await api.get('/error-logs');
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export default api;