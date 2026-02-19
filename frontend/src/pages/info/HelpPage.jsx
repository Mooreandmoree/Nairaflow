import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click "Get Started" on the homepage, fill in your details, verify your email, and you\'re ready to go!',
    },
    {
      question: 'How long do transfers take?',
      answer: 'Most transfers are completed within 2 minutes. Bank transfers to other banks may take up to 24 hours.',
    },
    {
      question: 'What are the transaction fees?',
      answer: 'Transactions up to ₦50,000 are FREE. 5% fee for ₦50,001-₦1,000,000. 7% for amounts above ₦1,000,000.',
    },
    {
      question: 'Is my money safe?',
      answer: 'Yes! We use 256-bit SSL encryption, are PCI DSS compliant, and CBN licensed. Your funds are protected.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and follow the link sent to your inbox.',
    },
    {
      question: 'Can I use NairaFlow outside Nigeria?',
      answer: 'Currently, NairaFlow is available only in Nigeria. We\'re working on expanding to other African countries.',
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-gray-400 mb-8">How can we help you today?</p>
          
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-neon text-center"
            />
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          {filteredFaqs.map((faq, index) => (
            <details key={index} className="glass-card p-4 group">
              <summary className="text-white font-medium cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-neon group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-400 mt-4 pt-4 border-t border-gray-700">
                {faq.answer}
              </p>
            </details>
          ))}
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6 text-center">
            <span className="text-4xl mb-4 block">📧</span>
            <h3 className="text-white font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm mb-4">Get help via email</p>
            <a href="mailto:support@nairaflow.com" className="text-neon hover:underline">
              support@nairaflow.com
            </a>
          </div>
          <div className="glass-card p-6 text-center">
            <span className="text-4xl mb-4 block">💬</span>
            <h3 className="text-white font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm mb-4">Chat with our team</p>
            <button className="text-neon hover:underline">Start Chat</button>
          </div>
          <div className="glass-card p-6 text-center">
            <span className="text-4xl mb-4 block">📞</span>
            <h3 className="text-white font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-400 text-sm mb-4">Call us directly</p>
            <a href="tel:+2348000000000" className="text-neon hover:underline">
              +234 800 000 0000
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;