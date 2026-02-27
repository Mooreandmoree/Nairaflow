import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
          throw new Error('Authentication was cancelled or failed');
        }

        if (provider === 'google' && accessToken) {
          setStatus('Getting your Google account info...');

          // Get Google user info
          const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!response.ok) {
            throw new Error('Failed to get Google user info');
          }

          const googleUser = await response.json();

          // Store user data locally
          const userData = {
            id: googleUser.id,
            email: googleUser.email,
            firstName: googleUser.given_name || googleUser.name?.split(' ')[0] || 'User',
            lastName: googleUser.family_name || googleUser.name?.split(' ')[1] || '',
            fullName: googleUser.name || googleUser.email,
            profilePhoto: googleUser.picture || null,
            role: 'USER',
          };

          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('loginTime', Date.now().toString());
          localStorage.setItem('authProvider', 'google');

          setStatus('Welcome! Redirecting to dashboard...');
          toast.success(`Welcome, ${userData.firstName}!`);

          // Force full page navigation to dashboard
          setTimeout(() => {
            window.location.replace('/dashboard');
          }, 500);
          return;

        } else if (provider === 'github' && code) {
          setStatus('Authenticating with GitHub...');
          // GitHub needs backend to exchange code for token
          toast.error('GitHub OAuth requires backend setup. Please use Google or email login.');
          setTimeout(() => {
            window.location.replace('/login');
          }, 2000);
          return;

        } else {
          throw new Error('No authentication data received');
        }

      } catch (error) {
        console.error('OAuth error:', error);
        setStatus('Authentication failed');
        toast.error(error.message || 'Authentication failed');
        setTimeout(() => {
          window.location.replace('/login');
        }, 2000);
      }
    };

    handleCallback();
  }, [location, provider]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-neon/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="animate-spin h-10 w-10 text-neon" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {provider === 'google' ? '🔐 Google' : '🐙 GitHub'} Authentication
        </h2>
        <p className="text-gray-400 text-lg">{status}</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
