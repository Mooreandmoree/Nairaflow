import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast Transfers',
      description: 'Complete transactions in under 2 minutes. Our advanced infrastructure ensures your money moves at the speed of light.',
    },
    {
      icon: '🔐',
      title: 'Bank-Grade Security',
      description: '256-bit SSL encryption, 2FA authentication, and real-time fraud monitoring keep your funds safe 24/7.',
    },
    {
      icon: '💱',
      title: 'Best Exchange Rates',
      description: 'Get competitive rates for USD/NGN conversions with transparent pricing. Only 3% fee on transactions over ₦50,000.',
    },
    {
      icon: '📱',
      title: 'Easy to Use',
      description: 'Intuitive interface designed for everyone. Send money, convert currencies, and manage your finances effortlessly.',
    },
    {
      icon: '🌍',
      title: 'Pan-African Coverage',
      description: 'Send and receive money across Nigeria and beyond. Expanding to cover all of Africa.',
    },
    {
      icon: '₿',
      title: 'Crypto Integration',
      description: 'Buy, sell, and convert cryptocurrencies seamlessly. Bitcoin, Ethereum, USDT, and more.',
    },
  ];

  const careers = [
    {
      title: 'Engineering Intern',
      type: 'Internship',
      location: 'Lagos, Nigeria (Remote)',
      description: 'Join our engineering team and work on cutting-edge fintech solutions. Learn from experienced developers while contributing to real products.',
      requirements: ['Currently pursuing CS/Engineering degree', 'Basic knowledge of React/Node.js', 'Passion for fintech'],
    },
    {
      title: 'Senior Software Developer',
      type: 'Full-time',
      location: 'Lagos, Nigeria (Hybrid)',
      description: 'Lead development of our core platform. Build scalable systems that handle millions of transactions.',
      requirements: ['5+ years experience', 'Expert in Java/Spring Boot', 'Experience with payment systems'],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">NairaFlow</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're building the future of money transfers in Africa. Fast, secure, and accessible to everyone.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            NairaFlow was born from a simple idea: money should move as fast as information. 
            We're a Nigerian fintech company on a mission to make financial transactions 
            lightning-fast, secure, and life-changing for millions of Africans.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mt-4">
            Whether you're sending money to family, paying for services, or converting 
            currencies, NairaFlow makes it simple. No more waiting days for transfers. 
            No more hidden fees. Just fast, transparent, and reliable financial services.
          </p>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why NairaFlow?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Careers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
          id="careers"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-gray-400 mb-8">
            We're looking for passionate individuals to help us revolutionize finance in Africa.
          </p>
          
          <div className="space-y-6">
            {careers.map((job, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <p className="text-gray-400">{job.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-neon/20 text-neon rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Requirements:</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn-neon px-6 py-2 text-sm">
                  <span>Apply Now</span>
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-6">
            Have questions? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@nairaflow.com" className="btn-neon-solid px-6 py-3">
              Email Us
            </a>
            <Link to="/register" className="btn-neon px-6 py-3">
              <span>Get Started</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;