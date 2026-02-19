import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CompanyPage = () => {
  const timeline = [
    {
      date: 'November 2025',
      title: 'The Beginning',
      description: 'Founder Momoh Bliss Osehon, frustrated with unreliable payment solutions in Nigeria, decides to build NairaFlow.',
    },
    {
      date: 'December 2025',
      title: 'First Prototype',
      description: 'Working alone, Bliss develops the first version of NairaFlow with core wallet and transfer features.',
    },
    {
      date: 'January 2026',
      title: 'Team Formation',
      description: 'The first team members join: Account specialists, Cybersecurity experts, and People & Culture team.',
    },
    {
      date: 'February 2026',
      title: 'Beta Launch',
      description: 'NairaFlow launches in beta with 1,000 early adopters testing the platform.',
    },
  ];

  const team = [
    { name: 'Momoh Bliss Osehon', role: 'Founder & CEO', image: '👨‍💻' },
    { name: 'Engineering Team', role: '5 developers', image: '⚙️' },
    { name: 'Cybersecurity Team', role: '3 specialists', image: '🔐' },
    { name: 'People & Culture', role: '2 members', image: '🤝' },
  ];

  const careers = [
    {
      title: 'Engineering Intern',
      type: 'Internship',
      location: 'Remote',
      description: 'Learn from experienced developers while building real fintech products.',
    },
    {
      title: 'Senior Software Developer',
      type: 'Full-time',
      location: 'Lagos (Hybrid)',
      description: 'Lead development of core platform features and mentor junior developers.',
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-gradient">Story</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building the future of payments in Africa, one transaction at a time.
          </p>
        </motion.div>

        {/* Founder Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">How It All Started</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              In late 2025, <strong className="text-white">Momoh Bliss Osehon</strong> discovered a 
              passion for coding. Like many Nigerians, he faced a common frustration: trying to make 
              online payments, specifically for a subscription to Anthropic's services, only to find 
              that existing payment solutions were unreliable, expensive, or simply didn't work.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Instead of waiting for someone else to solve the problem, Bliss decided to build the 
              solution himself. Working alone in his room, he began developing what would become 
              <span className="text-neon"> NairaFlow</span>.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              What started as a personal project quickly gained attention. Friends wanted to use it. 
              Then friends of friends. Within months, NairaFlow had grown from a one-person passion 
              project into a full-fledged fintech company with a dedicated team across engineering, 
              cybersecurity, and operations.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32 text-right">
                  <p className="text-neon font-medium">{event.date}</p>
                </div>
                <div className="w-px bg-neon/30 flex-shrink-0"></div>
                <div className="glass-card p-4 flex-1">
                  <h3 className="text-white font-semibold mb-1">{event.title}</h3>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <span className="text-5xl mb-4 block">{member.image}</span>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Careers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8"
          id="careers"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Join Our Team</h2>
          <p className="text-gray-400 mb-6">Help us revolutionize finance in Africa</p>
          
          <div className="space-y-4">
            {careers.map((job, index) => (
              <div key={index} className="p-4 bg-dark-300/50 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{job.title}</h3>
                  <p className="text-gray-500 text-sm">{job.location} • {job.type}</p>
                </div>
                <button className="btn-neon px-4 py-2 text-sm">
                  <span>Apply</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              To make financial transactions in Africa as fast and easy as sending a message. 
              We believe everyone deserves access to reliable, affordable, and secure financial services.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyPage;