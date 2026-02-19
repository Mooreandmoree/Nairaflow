import React from 'react';
import { motion } from 'framer-motion';

const WalletIcon = ({ size = 24, className = '', animated = true }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={animated ? { scale: 1.1 } : {}}
      whileTap={animated ? { scale: 0.95 } : {}}
    >
      <defs>
        <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39ff14" />
          <stop offset="100%" stopColor="#00ff88" />
        </linearGradient>
      </defs>
      
      {/* Wallet Body */}
      <motion.rect
        x="2"
        y="6"
        width="20"
        height="14"
        rx="2"
        stroke="url(#walletGradient)"
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Wallet Flap */}
      <motion.path
        d="M6 6V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V6"
        stroke="url(#walletGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      
      {/* Coin */}
      <motion.circle
        cx="17"
        cy="13"
        r="2"
        fill="#39ff14"
        initial={animated ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      />
    </motion.svg>
  );
};

export default WalletIcon;