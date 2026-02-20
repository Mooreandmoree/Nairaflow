import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us when you create an account, make transactions, or contact us for support.',
      items: [
        'Personal identification: Full name, email address, phone number, and date of birth',
        'Financial information: Bank account details, transaction history, and wallet balances',
        'Identity verification: Government-issued ID for KYC compliance',
        'Device information: IP address, browser type, operating system, and device identifiers',
        'Usage data: Pages visited, features used, and interaction patterns',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect for the following purposes:',
      items: [
        'Process transactions, deposits, withdrawals, and currency conversions',
        'Verify your identity and prevent fraud or unauthorized access',
        'Send transaction confirmations, security alerts, and account notifications',
        'Comply with Nigerian financial regulations (CBN guidelines) and international AML laws',
        'Improve our services, troubleshoot issues, and develop new features',
        'Provide customer support and respond to your inquiries',
      ],
    },
    {
      title: '3. Information Sharing & Disclosure',
      content: 'We do NOT sell, rent, or trade your personal information. We may share your data only in the following cases:',
      items: [
        'Payment processors: Paystack, Flutterwave, and banking partners to process transactions',
        'Regulatory authorities: When required by Nigerian law, CBN regulations, or court orders',
        'Identity verification: Third-party KYC providers for identity verification',
        'Service providers: Cloud hosting, email services, and analytics providers under strict data protection agreements',
        'Legal compliance: When necessary to protect our rights, safety, or property',
      ],
    },
    {
      title: '4. Data Security',
      content: 'We implement industry-leading security measures to protect your information:',
      items: [
        '256-bit SSL/TLS encryption for all data in transit',
        'AES-256 encryption for sensitive data at rest',
        'BCrypt password hashing with salt rounds',
        'Regular security audits and penetration testing',
        'Two-factor authentication (2FA) support',
        'Rate limiting and DDoS protection',
        'PCI DSS compliant payment processing',
      ],
    },
    {
      title: '5. Data Retention',
      content: 'We retain your information for as long as necessary to provide our services and comply with legal obligations:',
      items: [
        'Account data: Retained for the lifetime of your account plus 7 years after closure',
        'Transaction records: Retained for a minimum of 10 years as required by Nigerian financial regulations',
        'Communication records: Retained for 3 years',
        'You may request deletion of your account, subject to regulatory retention requirements',
      ],
    },
    {
      title: '6. Your Rights',
      content: 'Under the Nigeria Data Protection Regulation (NDPR) and applicable laws, you have the right to:',
      items: [
        'Access: Request a copy of your personal data we hold',
        'Correction: Request correction of inaccurate or incomplete data',
        'Deletion: Request deletion of your personal data (subject to legal obligations)',
        'Portability: Request your data in a machine-readable format',
        'Opt-out: Unsubscribe from marketing communications at any time',
        'Restrict processing: Request that we limit how we use your data',
        'Withdraw consent: Withdraw your consent to data processing at any time',
      ],
    },
    {
      title: '7. Cookies & Tracking',
      content: 'We use cookies and similar technologies to:',
      items: [
        'Remember your login status and preferences',
        'Analyze how you use our platform to improve user experience',
        'Prevent fraud and enhance security',
        'You can control cookies through your browser settings',
      ],
    },
    {
      title: '8. Third-Party Services',
      content: 'Our platform integrates with the following third-party services:',
      items: [
        'Paystack: Payment processing (governed by Paystack\'s privacy policy)',
        'Google OAuth: Social login (governed by Google\'s privacy policy)',
        'GitHub OAuth: Social login (governed by GitHub\'s privacy policy)',
        'CoinGecko API: Cryptocurrency market data',
      ],
    },
    {
      title: '9. Children\'s Privacy',
      content: 'NairaFlow is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we discover that we have collected data from a minor, we will promptly delete it.',
      items: [],
    },
    {
      title: '10. Changes to This Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of material changes via email or through a notice on our platform. Your continued use of NairaFlow after changes constitutes acceptance of the updated policy.',
      items: [],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">
              Last updated: February 2026 | Effective date: February 2026
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                NDPR Compliant
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                GDPR Ready
              </span>
            </div>
          </div>

          {/* Introduction */}
          <div className="glass-card p-8 mb-8">
            <p className="text-gray-300 leading-relaxed">
              At <strong className="text-neon">NairaFlow</strong>, we are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our financial technology platform.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              By using NairaFlow, you agree to the collection and use of information in accordance with this policy.
              If you do not agree with our practices, please do not use our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                <p className="text-gray-300 mb-4">{section.content}</p>
                {section.items.length > 0 && (
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-gray-400">
                        <span className="text-neon mt-1.5 text-xs">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="glass-card p-8 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-300/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-neon font-medium">privacy@nairaflow.com</p>
              </div>
              <div className="bg-dark-300/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Data Protection Officer</p>
                <p className="text-neon font-medium">dpo@nairaflow.com</p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-neon transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/security" className="text-gray-400 hover:text-neon transition-colors">
              Security
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/help" className="text-gray-400 hover:text-neon transition-colors">
              Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
