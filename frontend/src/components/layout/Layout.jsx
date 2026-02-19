import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import AnimatedLogo from '../SVG/AnimatedLogo';
import BackgroundAnimation from '../SVG/BackgroundAnimation';
import { 
  HiOutlineHome, 
  HiOutlineCreditCard, 
  HiOutlineArrowsRightLeft,
  HiOutlineClipboardDocumentList,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark
} from 'react-icons/hi2';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { path: '/wallets', label: 'Wallets', icon: HiOutlineCreditCard },
    { path: '/convert', label: 'Convert', icon: HiOutlineArrowsRightLeft },
    { path: '/transactions', label: 'Transactions', icon: HiOutlineClipboardDocumentList },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <BackgroundAnimation />
      
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-dark-400/80 backdrop-blur-xl border-r border-neon/10 hidden lg:flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-neon/10">
          <div className="flex items-center gap-3">
            <AnimatedLogo size={40} />
            <span className="text-xl font-bold text-neon animate-glow">NairaFlow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'text-neon bg-neon/10' 
                    : 'text-gray-400 hover:text-neon hover:bg-neon/5'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-neon rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-neon/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-dark-300/50">
            <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-400/80 backdrop-blur-xl border-b border-neon/10 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <AnimatedLogo size={32} />
          <span className="text-lg font-bold text-neon">NairaFlow</span>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-neon"
        >
          {mobileMenuOpen ? (
            <HiOutlineXMark className="w-6 h-6" />
          ) : (
            <HiOutlineBars3 className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed right-0 top-0 h-full w-64 bg-dark-400 border-l border-neon/10 z-50 flex flex-col"
            >
              <div className="p-4 border-b border-neon/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${isActive 
                          ? 'text-neon bg-neon/10' 
                          : 'text-gray-400 hover:text-neon'
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
              
              <div className="p-4 border-t border-neon/10">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-4 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
