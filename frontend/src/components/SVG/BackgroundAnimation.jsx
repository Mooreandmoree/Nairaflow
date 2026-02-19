import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
  }, []);

  const floatingOrbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 30 + 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(57, 255, 20, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(0, 255, 136, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at bottom left, rgba(57, 255, 20, 0.03) 0%, transparent 40%)
          `,
        }}
      />

      {/* Floating Orbs */}
      {floatingOrbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid Pattern */}
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0 opacity-20"
      >
        <defs>
          <pattern 
            id="grid" 
            width="60" 
            height="60" 
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(57, 255, 20, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Particles */}
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
      >
        <defs>
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {particles.map((particle) => (
          <motion.circle
            key={`particle-${particle.id}`}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill="url(#particleGradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              cy: [`${particle.y}%`, `${particle.y - 15}%`, `${particle.y}%`],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Scan Lines Effect (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(57, 255, 20, 0.5) 2px,
            rgba(57, 255, 20, 0.5) 4px
          )`,
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;