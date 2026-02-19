import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last updated: February 2026</p>

          <div className="glass-card p-8 prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-white mt-6 mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Name, email address, and phone number</li>
              <li>Bank account and payment information</li>
              <li>Transaction history and wallet activity</li>
              <li>Device information and IP address</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Process transactions and manage your account</li>
              <li>Send transaction notifications and updates</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and user experience</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Payment processors and banking partners</li>
              <li>Regulatory authorities when required by law</li>
              <li>Service providers who assist our operations</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">4. Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement industry-standard security measures including 256-bit SSL encryption, 
              secure data centers, and regular security audits to protect your information.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">5. Your Rights</h2>
            <p className="text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">6. Contact Us</h2>
            <p className="text-gray-300">
              For privacy-related questions, contact us at privacy@nairaflow.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;