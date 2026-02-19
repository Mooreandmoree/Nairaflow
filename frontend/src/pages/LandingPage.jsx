import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchCryptoRates } from '../services/ratesApi';

const LandingPage = () => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const loadRates = async () => {
      const data = await fetchCryptoRates();
      setRates(data);
    };
    loadRates();
    const interval = setInterval(loadRates, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white">Send Money</span>
              <br />
              <span className="text-gradient">Across Africa</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Lightning-fast transfers, real-time crypto rates, and the best exchange rates. 
              Your money, your way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register" className="btn-neon-solid px-8 py-4 text-lg font-semibold">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-neon px-8 py-4 text-lg">
                <span>Sign In</span>
              </Link>
            </motion.div>
          </div>

          {/* Live Rates Preview */}
          {rates && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Live Exchange Rates</h3>
                <span className="text-xs text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-dark-300/50 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">USD/NGN</p>
                  <p className="text-2xl font-bold text-white">₦{rates.usdToNgn?.toLocaleString()}</p>
                </div>
                {Object.values(rates.crypto || {}).slice(0, 5).map((crypto) => (
                  <div key={crypto.symbol} className="bg-dark-300/50 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                    <p className="text-xl font-bold text-white">${crypto.usd?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '₦50B+', label: 'Transferred' },
              { value: '100K+', label: 'Users' },
              { value: '99.9%', label: 'Uptime' },
              { value: '<2min', label: 'Transfer Time' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient">NairaFlow</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Transfers complete in under 2 minutes. No more waiting.',
              },
              {
                icon: '🔒',
                title: 'Bank-Level Security',
                description: '256-bit encryption and 2FA keep your money safe.',
              },
              {
                icon: '💰',
                title: 'Best Rates',
                description: 'Competitive rates with only 3% fee on large transactions.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
            <p className="text-gray-400 mb-8">Join thousands who trust NairaFlow</p>
            <Link to="/register" className="btn-neon-solid px-10 py-4 text-lg font-semibold">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;