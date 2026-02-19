import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ size = 60, className = '', showText = false }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <defs>
          {/* Bright neon gradient */}
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39ff14" />
            <stop offset="50%" stopColor="#50ff30" />
            <stop offset="100%" stopColor="#39ff14" />
          </linearGradient>
          
          {/* Glow filter - makes it shine */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Outer glow for the circle */}
          <filter id="outerGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feFlood floodColor="#39ff14" floodOpacity="0.6"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#39ff14"
          strokeWidth="1"
          opacity="0.3"
          filter="url(#outerGlow)"
        />

        {/* Main circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="rgba(57, 255, 20, 0.05)"
          stroke="url(#neonGradient)"
          strokeWidth="2.5"
          variants={pathVariants}
          filter="url(#glow)"
        />

        {/* ₦ Symbol (Naira Sign) */}
        <motion.g filter="url(#glow)">
          {/* Main N shape */}
          <motion.path
            d="M24 72 L24 28 Q24 26 26 26 L30 26 L48 56 L48 28 Q48 26 50 26 L54 26 Q56 26 56 28 L56 72 Q56 74 54 74 L50 74 L32 44 L32 72 Q32 74 30 74 L26 74 Q24 74 24 72 Z"
            fill="url(#neonGradient)"
            stroke="none"
            variants={pathVariants}
          />
          
          {/* Naira cross lines */}
          <motion.line
            x1="20"
            y1="42"
            x2="60"
            y2="42"
            stroke="url(#neonGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            variants={pathVariants}
          />
          <motion.line
            x1="20"
            y1="54"
            x2="60"
            y2="54"
            stroke="url(#neonGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            variants={pathVariants}
          />
        </motion.g>

        {/* F Letter */}
        <motion.g filter="url(#glow)">
          <motion.path
            d="M64 28 L64 72 Q64 74 66 74 L70 74 Q72 74 72 72 L72 54 L84 54 Q86 54 86 52 L86 48 Q86 46 84 46 L72 46 L72 34 L86 34 Q88 34 88 32 L88 28 Q88 26 86 26 L66 26 Q64 26 64 28 Z"
            fill="url(#neonGradient)"
            stroke="none"
            variants={pathVariants}
          />
        </motion.g>

        {/* Animated pulse dot */}
        <motion.circle
          cx="50"
          cy="90"
          r="3"
          fill="#39ff14"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.svg>
      
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          {/* Text with neon glow effect - NO black border */}
          <span 
            className="text-2xl font-bold text-neon"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              textShadow: `
                0 0 10px rgba(57, 255, 20, 0.8),
                0 0 20px rgba(57, 255, 20, 0.6),
                0 0 30px rgba(57, 255, 20, 0.4),
                0 0 40px rgba(57, 255, 20, 0.2)
              `,
              letterSpacing: '0.5px',
            }}
          >
            NairaFlow
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedLogo;