import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    {
      label: 'Product',
      items: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '/security' },
      ],
    },
    {
      label: 'Company',
      items: [
        { label: 'About', href: '/about' },
        { label: 'Our Story', href: '/company' },
        { label: 'Careers', href: '/company#careers' },
      ],
    },
    {
      label: 'Resources',
      items: [
        { label: 'Help Center', href: '/help' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark/80 border-b border-neon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center">
              <span className="text-dark font-bold text-xl">₦</span>
            </div>
            <span className="text-xl font-bold text-white">NairaFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!user && navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-gray-300 hover:text-neon transition-colors flex items-center space-x-1">
                  <span>{link.label}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 py-2 bg-dark-300 rounded-xl shadow-xl border border-neon/10"
                    >
                      {link.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block px-4 py-2 text-gray-300 hover:text-neon hover:bg-dark-200 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-neon transition-colors">
                  Dashboard
                </Link>
                <Link to="/send" className="text-gray-300 hover:text-neon transition-colors">
                  Send
                </Link>
                <Link to="/transactions" className="text-gray-300 hover:text-neon transition-colors">
                  History
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-neon transition-colors">
                    <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center">
                      <span className="text-neon font-medium">
                        {user.firstName?.[0] || 'U'}
                      </span>
                    </div>
                    <span>{user.firstName}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-dark-300 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-neon/10">
                    <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:text-neon hover:bg-dark-200">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-300 hover:text-neon hover:bg-dark-200">
                      Settings
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-dark-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-neon transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-neon-solid px-4 py-2 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-neon"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-300 border-t border-neon/10"
          >
            <div className="px-4 py-4 space-y-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                  <Link to="/send" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Send Money</Link>
                  <Link to="/transactions" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>History</Link>
                  <Link to="/profile" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block py-2 text-red-400">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/features" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                  <Link to="/pricing" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                  <Link to="/about" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                  <Link to="/login" className="block py-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" className="block py-2 text-neon font-medium" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;