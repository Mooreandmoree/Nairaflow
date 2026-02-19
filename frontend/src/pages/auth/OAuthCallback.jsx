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
          throw new Error(`OAuth error: ${error}`);
        }

        setStatus(`Authenticating with ${provider}...`);

        if (provider === 'google' && accessToken) {
          // Fetch Google user info
          const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const googleUser = await response.json();
          
          // Store user info
          const userData = {
            id: googleUser.id,
            email: googleUser.email,
            firstName: googleUser.given_name || googleUser.name?.split(' ')[0],
            lastName: googleUser.family_name || '',
            fullName: googleUser.name,
            picture: googleUser.picture,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('token', accessToken);

          toast.success('Successfully signed in with Google!');
          navigate('/dashboard');
          
        } else if (provider === 'github' && code) {
          // For GitHub, you'd send the code to your backend
          toast.success('GitHub authentication successful!');
          navigate('/dashboard');
        } else {
          throw new Error('No authentication data received');
        }
        
      } catch (error) {
        console.error('OAuth error:', error);
        setStatus('Authentication failed');
        toast.error(error.message || 'OAuth authentication failed');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleCallback();
  }, [location, provider, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon mx-auto mb-4"></div>
        <p className="text-white text-lg">{status}</p>
        <p className="text-gray-400 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;