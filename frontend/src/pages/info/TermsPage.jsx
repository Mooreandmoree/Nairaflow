import React from 'react';
import { motion } from 'framer-motion';

const TermsPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last updated: February 2026</p>

          <div className="glass-card p-8 prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-white mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing or using NairaFlow, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using this service.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">2. Eligibility</h2>
            <p className="text-gray-300 mb-6">
              You must be at least 18 years old to use NairaFlow. By using our services, you 
              represent that you are of legal age and have the legal capacity to enter into 
              binding contracts.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">3. Account Registration</h2>
            <p className="text-gray-300 mb-6">
              You must provide accurate and complete information when creating an account. 
              You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities under your account.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">4. Transaction Fees</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Transactions up to ₦50,000: FREE</li>
              <li>Transactions ₦50,001 - ₦1,000,000: 5% fee</li>
              <li>Transactions above ₦1,000,000: 7% fee</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">5. Prohibited Activities</h2>
            <p className="text-gray-300 mb-4">You may not use NairaFlow for:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Money laundering or terrorist financing</li>
              <li>Fraudulent transactions</li>
              <li>Illegal goods or services</li>
              <li>Violating any applicable laws</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-300 mb-6">
              NairaFlow shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">7. Contact</h2>
            <p className="text-gray-300">
              For questions about these Terms, contact us at legal@nairaflow.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;