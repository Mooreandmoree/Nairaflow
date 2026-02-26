import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.message);

    if (error.response?.status === 401) {
      // Don't redirect if we're on OAuth callback or login page
      const currentPath = window.location.pathname;
      const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
      const isAuthCallback = currentPath.includes('/auth/');
      const isPublicPath = publicPaths.some(path => currentPath.startsWith(path));

      if (!isAuthCallback && !isPublicPath) {
        // Only clear auth and redirect if on a protected page
        const authProvider = localStorage.getItem('authProvider');
        if (authProvider !== 'google') {
          // Don't auto-redirect Google OAuth users
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('loginTime');
          localStorage.removeItem('authProvider');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
