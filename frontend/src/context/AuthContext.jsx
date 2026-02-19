import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wallets, setWallets] = useState([]);

  // Check for stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Fetch wallets if user exists
        fetchWallets();
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Fetch user wallets
  const fetchWallets = async () => {
    try {
      const response = await api.get('/wallets');
      setWallets(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const response = await api.post('/auth/login', { email, password });
      
      console.log('Login response:', response.data);
      
      const data = response.data.data || response.data;
      const token = data.token;
      const userData = {
        id: data.id || data.userId,
        email: data.email,
        firstName: data.fullName?.split(' ')[0] || data.firstName,
        lastName: data.fullName?.split(' ')[1] || data.lastName,
        fullName: data.fullName,
        role: data.role,
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Fetch wallets after login
      await fetchWallets();
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Login failed. Please check your credentials.';
      throw new Error(message);
    }
  };

  // Register function
  const register = async (formData) => {
    try {
      console.log('Attempting registration for:', formData.email);
      
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      
      const response = await api.post('/auth/register', registerData);
      
      console.log('Registration response:', response.data);
      
      const data = response.data.data || response.data;
      const token = data.token;
      const userData = {
        id: data.id || data.userId,
        email: data.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: data.fullName || `${formData.firstName} ${formData.lastName}`,
        role: data.role,
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Fetch wallets after registration
      await fetchWallets();
      
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.';
      throw new Error(message);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setWallets([]);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      const updatedUser = { ...user, ...response.data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const value = {
    user,
    wallets,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    fetchWallets,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;