import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Effects
import ParticleBackground from './components/effects/ParticleBackground';
import FloatingOrbs from './components/effects/FloatingOrbs';
import SplashScreen from './components/effects/SplashScreen';

// Auth Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import OAuthCallback from './pages/auth/OAuthCallback';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import SendMoney from './pages/transactions/SendMoney';
import AddMoney from './pages/transactions/AddMoney';
import TransactionHistory from './pages/transactions/TransactionHistory';
import ConvertCurrency from './pages/transactions/ConvertCurrency';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

// Info Pages
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/info/FeaturesPage';
import PricingPage from './pages/info/PricingPage';
import SecurityPage from './pages/info/SecurityPage';
import CompanyPage from './pages/info/CompanyPage';
import PrivacyPage from './pages/info/PrivacyPage';
import TermsPage from './pages/info/TermsPage';
import HelpPage from './pages/info/HelpPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
      setAppReady(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
    setAppReady(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!appReady) return null;

  return (
    <AuthProvider>
      <Router>
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-300 to-dark" />
          <FloatingOrbs />
          <ParticleBackground />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/:provider/callback" element={<OAuthCallback />} />
              
              {/* Info Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/careers" element={<Navigate to="/company#careers" replace />} />
              
              {/* Protected */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
              <Route path="/add-money" element={<ProtectedRoute><AddMoney /></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
              <Route path="/convert" element={<ProtectedRoute><ConvertCurrency /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(20, 20, 20, 0.95)',
              color: '#fff',
              border: '1px solid rgba(57, 255, 20, 0.2)',
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;