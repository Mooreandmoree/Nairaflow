import React from 'react';
import { motion } from 'framer-motion';

const FloatingOrbs = () => {
  const orbs = [
    { size: 300, x: '10%', y: '20%', duration: 20 },
    { size: 200, x: '80%', y: '10%', duration: 25 },
    { size: 250, x: '70%', y: '70%', duration: 22 },
    { size: 180, x: '20%', y: '80%', duration: 28 },
    { size: 150, x: '50%', y: '50%', duration: 18 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(57, 255, 20, 0.1) 0%, rgba(57, 255, 20, 0.02) 50%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;