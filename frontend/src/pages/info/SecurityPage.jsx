import React from 'react';
import { motion } from 'framer-motion';

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: '🔒',
      title: '256-bit SSL Encryption',
      description: 'All data transmitted between your device and our servers is encrypted using industry-standard 256-bit SSL encryption. This is the same level of security used by major banks worldwide.',
      details: [
        'End-to-end encryption for all transactions',
        'Secure HTTPS connections',
        'Regular security audits',
        'Protected against man-in-the-middle attacks',
      ],
    },
    {
      icon: '🛡️',
      title: 'PCI DSS Compliant',
      description: 'NairaFlow is PCI DSS (Payment Card Industry Data Security Standard) compliant. This means we meet the highest standards for handling credit card information.',
      details: [
        'Card data is never stored on our servers',
        'Tokenized payment processing',
        'Regular compliance assessments',
        'Secure payment gateway integration',
      ],
    },
    {
      icon: '✓',
      title: 'CBN Licensed',
      description: 'NairaFlow operates under the regulatory framework of the Central Bank of Nigeria (CBN). Your funds are protected under Nigerian financial laws.',
      details: [
        'Licensed payment service provider',
        'Regular regulatory reporting',
        'Customer funds protection',
        'Dispute resolution mechanisms',
      ],
    },
    {
      icon: '🔐',
      title: '2FA Protection',
      description: 'Two-Factor Authentication adds an extra layer of security. Even if someone knows your password, they cannot access your account without the second factor.',
      details: [
        'SMS verification codes',
        'Email confirmation for sensitive actions',
        'Biometric authentication (coming soon)',
        'Hardware security keys support',
      ],
    },
  ];

  const additionalMeasures = [
    { title: 'Real-time Fraud Monitoring', description: 'AI-powered systems detect suspicious activity instantly' },
    { title: 'Automatic Session Timeout', description: 'Sessions expire after inactivity to prevent unauthorized access' },
    { title: 'Device Recognition', description: 'We alert you when a new device accesses your account' },
    { title: 'Transaction Limits', description: 'Customizable limits protect against unauthorized large transfers' },
    { title: 'Secure Password Requirements', description: 'Strong password policies prevent weak credentials' },
    { title: 'Regular Security Updates', description: 'Our systems are continuously updated against new threats' },
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
            Bank-Level <span className="text-gradient">Security</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your security is our top priority. We employ multiple layers of protection to keep your funds safe.
          </p>
        </motion.div>

        {/* Main Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="text-sm text-gray-500 flex items-start">
                    <span className="text-neon mr-2 mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Measures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Additional Security Measures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalMeasures.map((measure, index) => (
              <div key={index} className="p-4 bg-dark-300/50 rounded-xl">
                <h4 className="text-white font-medium mb-1">{measure.title}</h4>
                <p className="text-gray-500 text-sm">{measure.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-card p-8 inline-block">
            <p className="text-2xl text-white font-semibold mb-2">🛡️ Our Security Promise</p>
            <p className="text-gray-400 max-w-xl">
              If your account is ever compromised due to a security flaw on our end, 
              we will fully reimburse any lost funds. Your trust is our foundation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityPage;