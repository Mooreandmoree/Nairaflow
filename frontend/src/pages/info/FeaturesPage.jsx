import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Transfers complete in under 2 minutes.' },
    { icon: '💱', title: 'Currency Conversion', description: 'Convert NGN, USD, and crypto easily.' },
    { icon: '📊', title: 'Real-Time Rates', description: 'Live market data and charts.' },
    { icon: '🔐', title: 'Bank Security', description: '256-bit SSL encryption and 2FA.' },
    { icon: '💳', title: 'Multiple Payments', description: 'Card, bank transfer, and mobile money.' },
    { icon: '📱', title: 'Mobile Ready', description: 'Works on all devices.' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your money.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register" className="btn-neon-solid px-8 py-4 text-lg font-semibold">
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;