import React from 'react';
import { motion } from 'framer-motion';

const TransactionIcon = ({ type = 'default', size = 24, className = '' }) => {
  switch (type) {
    case 'DEPOSIT':
      return <DepositIcon size={size} className={className} />;
    case 'WITHDRAWAL':
      return <WithdrawalIcon size={size} className={className} />;
    case 'CONVERSION':
      return <ConversionIcon size={size} className={className} />;
    default:
      return <DefaultIcon size={size} className={className} />;
  }
};

const DepositIcon = ({ size, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={className}
    whileHover={{ scale: 1.1 }}
  >
    <defs>
      <linearGradient id="depositGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#39ff14" />
        <stop offset="100%" stopColor="#00ff88" />
      </linearGradient>
      <filter id="depositShadow">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Background */}
    <circle cx="20" cy="20" r="18" fill="rgba(57, 255, 20, 0.15)" stroke="#39ff14" strokeWidth="2"/>
    
    {/* Arrow shadow */}
    <path
      d="M20 10 L20 26 M13 19 L20 26 L27 19"
      stroke="#000"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.3"
      transform="translate(1, 1)"
    />
    
    {/* Arrow */}
    <motion.path
      d="M20 10 L20 26 M13 19 L20 26 L27 19"
      stroke="url(#depositGrad)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      filter="url(#depositShadow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
);

const WithdrawalIcon = ({ size, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={className}
    whileHover={{ scale: 1.1 }}
  >
    <defs>
      <linearGradient id="withdrawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4444" />
        <stop offset="100%" stopColor="#ff6b6b" />
      </linearGradient>
      <filter id="withdrawShadow">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Background */}
    <circle cx="20" cy="20" r="18" fill="rgba(255, 68, 68, 0.15)" stroke="#ff4444" strokeWidth="2"/>
    
    {/* Arrow shadow */}
    <path
      d="M20 26 L20 10 M13 17 L20 10 L27 17"
      stroke="#000"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.3"
      transform="translate(1, 1)"
    />
    
    {/* Arrow */}
    <motion.path
      d="M20 26 L20 10 M13 17 L20 10 L27 17"
      stroke="url(#withdrawGrad)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      filter="url(#withdrawShadow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
);

const ConversionIcon = ({ size, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={className}
    whileHover={{ scale: 1.1, rotate: 180 }}
    transition={{ duration: 0.3 }}
  >
    <defs>
      <linearGradient id="convertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00aaff" />
        <stop offset="100%" stopColor="#00ddff" />
      </linearGradient>
      <filter id="convertShadow">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Background */}
    <circle cx="20" cy="20" r="18" fill="rgba(0, 170, 255, 0.15)" stroke="#00aaff" strokeWidth="2"/>
    
    {/* Arrows shadow */}
    <g opacity="0.3" transform="translate(1, 1)">
      <path d="M10 14 L16 10 L16 18" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M30 26 L24 30 L24 22" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="16" y1="14" x2="28" y2="14" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="26" x2="24" y2="26" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
    
    {/* Arrows */}
    <g filter="url(#convertShadow)">
      <motion.path 
        d="M10 14 L16 10 L16 18" 
        stroke="url(#convertGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path 
        d="M30 26 L24 30 L24 22" 
        stroke="url(#convertGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.line 
        x1="16" y1="14" x2="28" y2="14" 
        stroke="url(#convertGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.line 
        x1="12" y1="26" x2="24" y2="26" 
        stroke="url(#convertGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
    </g>
  </motion.svg>
);

const DefaultIcon = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    className={className}
  >
    <circle cx="20" cy="20" r="18" fill="rgba(128, 128, 128, 0.15)" stroke="#888" strokeWidth="2"/>
    <circle cx="20" cy="20" r="6" fill="#888"/>
  </svg>
);

export default TransactionIcon;