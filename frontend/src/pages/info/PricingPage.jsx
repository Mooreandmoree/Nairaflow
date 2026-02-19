import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400">No hidden fees. Pay only when you transact.</p>
        </motion.div>

        <div className="glass-card p-8 mb-8 border-2 border-neon/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">NairaFlow</h2>
              <p className="text-gray-400">For everyone</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-neon">FREE</p>
              <p className="text-gray-500">to download</p>
            </div>
          </div>
          <Link to="/register" className="btn-neon-solid w-full py-4 text-lg font-semibold text-center block">
            Get Started Free
          </Link>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Transaction Fees</h2>
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-dark-300/50 rounded-xl">
              <span className="text-white">Up to ₦50,000</span>
              <span className="text-neon font-bold">FREE</span>
            </div>
            <div className="flex justify-between p-4 bg-dark-300/50 rounded-xl">
              <span className="text-white">₦50,001 - ₦1,000,000</span>
              <span className="text-yellow-400 font-bold">5%</span>
            </div>
            <div className="flex justify-between p-4 bg-dark-300/50 rounded-xl">
              <span className="text-white">Above ₦1,000,000</span>
              <span className="text-orange-400 font-bold">7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;