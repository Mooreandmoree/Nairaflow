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
        profilePhoto: data.profilePhoto || null,
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Save login time for session management
      localStorage.setItem('loginTime', Date.now().toString());

      setUser(userData);
      await fetchWallets();

      return userData;
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Login failed. Please check your credentials.';
      throw new Error(message);
    }
  };

  // Register function - NO AUTO LOGIN
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
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.';
      throw new Error(message);
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      throw new Error(message);
    }
  };

  // Reset Password
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password';
      throw new Error(message);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    // Keep rememberedEmail and rememberMe if set
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

  // Upload profile photo
  const uploadProfilePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await api.post('/users/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = { ...user, profilePhoto: response.data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload photo');
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
    uploadProfilePhoto,
    fetchWallets,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
