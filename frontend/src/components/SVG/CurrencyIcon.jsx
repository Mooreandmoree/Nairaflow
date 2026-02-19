import React from 'react';
import { motion } from 'framer-motion';

const CurrencyIcon = ({ currency, size = 40, className = '' }) => {
  if (currency === 'USD') {
    return <USDIcon size={size} className={className} />;
  }
  return <NGNIcon size={size} className={className} />;
};

const USDIcon = ({ size, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    className={className}
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    <defs>
      <linearGradient id="usdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#39ff14" />
        <stop offset="100%" stopColor="#00ff88" />
      </linearGradient>
      <filter id="usdShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.5"/>
      </filter>
    </defs>
    
    {/* Background circle - shadow */}
    <circle cx="25" cy="25" r="22" fill="#000" opacity="0.3" transform="translate(1, 2)"/>
    
    {/* Background circle */}
    <circle 
      cx="25" 
      cy="25" 
      r="22" 
      fill="rgba(57, 255, 20, 0.1)"
      stroke="url(#usdGrad)"
      strokeWidth="2"
    />
    
    {/* Dollar sign - shadow */}
    <text
      x="25"
      y="33"
      textAnchor="middle"
      fontSize="24"
      fontWeight="bold"
      fontFamily="monospace"
      fill="#000"
      transform="translate(1, 1)"
    >
      $
    </text>
    
    {/* Dollar sign */}
    <text
      x="25"
      y="33"
      textAnchor="middle"
      fontSize="24"
      fontWeight="bold"
      fontFamily="monospace"
      fill="url(#usdGrad)"
      filter="url(#usdShadow)"
    >
      $
    </text>
  </motion.svg>
);

const NGNIcon = ({ size, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    className={className}
    whileHover={{ scale: 1.1, rotate: -5 }}
    whileTap={{ scale: 0.95 }}
  >
    <defs>
      <linearGradient id="ngnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#39ff14" />
        <stop offset="100%" stopColor="#00ff88" />
      </linearGradient>
      <filter id="ngnShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.5"/>
      </filter>
    </defs>
    
    {/* Background circle - shadow */}
    <circle cx="25" cy="25" r="22" fill="#000" opacity="0.3" transform="translate(1, 2)"/>
    
    {/* Background circle */}
    <circle 
      cx="25" 
      cy="25" 
      r="22" 
      fill="rgba(57, 255, 20, 0.1)"
      stroke="url(#ngnGrad)"
      strokeWidth="2"
    />
    
    {/* Naira sign - shadow */}
    <text
      x="25"
      y="33"
      textAnchor="middle"
      fontSize="22"
      fontWeight="bold"
      fontFamily="monospace"
      fill="#000"
      transform="translate(1, 1)"
    >
      ₦
    </text>
    
    {/* Naira sign */}
    <text
      x="25"
      y="33"
      textAnchor="middle"
      fontSize="22"
      fontWeight="bold"
      fontFamily="monospace"
      fill="url(#ngnGrad)"
      filter="url(#ngnShadow)"
    >
      ₦
    </text>
  </motion.svg>
);

export default CurrencyIcon;