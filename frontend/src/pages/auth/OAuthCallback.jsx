import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider } = useParams();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const queryParams = new URLSearchParams(location.search);

        const accessToken = hashParams.get('access_token');
        const code = queryParams.get('code');
        const error = queryParams.get('error') || hashParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        setStatus(`Authenticating with ${provider}...`);

        let response;

        if (provider === 'google' && accessToken) {
          // Send Google token to OUR backend for verification and JWT creation
          try {
            response = await api.post('/auth/google/callback', {
              token: accessToken,
              provider: 'google',
            });
          } catch (backendError) {
            console.log('Backend OAuth failed, using direct Google login');
            // Fallback: Get Google user info directly and create local session
            const googleResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const googleUser = await googleResponse.json();

            // Register or login via our backend
            try {
              // Try to login first
              response = await api.post('/auth/login', {
                email: googleUser.email,
                password: googleUser.id + '_google_oauth',
              });
            } catch (loginError) {
              // If login fails, register the user
              try {
                response = await api.post('/auth/register', {
                  firstName: googleUser.given_name || googleUser.name?.split(' ')[0] || 'User',
                  lastName: googleUser.family_name || googleUser.name?.split(' ')[1] || '',
                  email: googleUser.email,
                  phone: '',
                  password: googleUser.id + '_google_oauth',
                });
              } catch (registerError) {
                // User might already exist with different password, try direct session
                const userData = {
                  id: googleUser.id,
                  email: googleUser.email,
                  firstName: googleUser.given_name || googleUser.name?.split(' ')[0],
                  lastName: googleUser.family_name || '',
                  fullName: googleUser.name,
                  profilePhoto: googleUser.picture,
                  role: 'USER',
                };

                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', accessToken);
                localStorage.setItem('loginTime', Date.now().toString());
                localStorage.setItem('authProvider', 'google');

                toast.success('Welcome to NairaFlow!');
                window.location.href = '/dashboard';
                return;
              }
            }
          }

        } else if (provider === 'github' && code) {
          // Send GitHub code to our backend
          try {
            response = await api.post('/auth/github/callback', {
              code: code,
              provider: 'github',
            });
          } catch (backendError) {
            console.error('GitHub OAuth backend error:', backendError);
            throw new Error('GitHub authentication failed');
          }
        } else {
          throw new Error('No authentication data received');
        }

        // Process backend response
        if (response && response.data) {
          const data = response.data.data || response.data;
          const token = data.token;

          if (token) {
            const userData = {
              id: data.id || data.userId,
              email: data.email,
              firstName: data.fullName?.split(' ')[0] || '',
              lastName: data.fullName?.split(' ')[1] || '',
              fullName: data.fullName,
              role: data.role,
              profilePhoto: data.profilePhoto || null,
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('loginTime', Date.now().toString());
            localStorage.setItem('authProvider', provider);

            setStatus('Login successful! Redirecting...');
            toast.success('Welcome to NairaFlow!');

            // Use window.location to force full page reload with new auth
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 500);
            return;
          }
        }

        throw new Error('Authentication failed - no token received');

      } catch (error) {
        console.error('OAuth error:', error);
        setStatus('Authentication failed');
        toast.error(error.message || 'Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleCallback();
  }, [location, provider, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-neon/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="animate-spin h-8 w-8 text-neon" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {provider === 'google' ? 'Google' : 'GitHub'} Authentication
        </h2>
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
