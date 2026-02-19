import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation Presets for Micro Interactions
export const animationPresets = {
  // Page Transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },

  // Stagger Children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },

  // Hover Effects
  hoverLift: {
    scale: 1.05,
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },

  hoverGlow: {
    boxShadow: "0 0 20px rgba(57, 255, 20, 0.3)",
    transition: { duration: 0.3 },
  },

  // Button Interactions
  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },

  // Loading States
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity },
  },

  // Number Counters
  counter: {
    scale: [0.5, 1.2, 1],
    transition: { duration: 0.6, type: "spring", stiffness: 200 },
  },

  // Icon Animations
  iconBounce: {
    y: [0, -10, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
  },

  // Form Field Focus
  inputFocus: {
    scale: 1.02,
    borderColor: "rgba(57, 255, 20, 0.5)",
    transition: { duration: 0.2 },
  },
};

// Reusable Animated Components
export const AnimatedCard = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={animationPresets.hoverLift}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedButton = ({
  children,
  onClick,
  className = "",
  variant = "neon",
}) => (
  <motion.button
    whileHover={animationPresets.hoverLift}
    whileTap={animationPresets.buttonTap}
    onClick={onClick}
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    {children}
  </motion.button>
);

export const AnimatedInput = ({ className = "", ...props }) => (
  <motion.input
    whileFocus={animationPresets.inputFocus}
    transition={{ duration: 0.2 }}
    className={className}
    {...props}
  />
);

export const AnimatedIcon = ({ children, className = "", animate = false }) => (
  <motion.div
    animate={animate ? animationPresets.iconBounce : {}}
    className={className}
  >
    {children}
  </motion.div>
);

// Page Transition Wrapper
export const PageTransition = ({ children, className = "" }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={animationPresets.pageTransition}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger Animation Wrapper
export const StaggerContainer = ({ children, className = "" }) => (
  <motion.div
    variants={animationPresets.staggerContainer}
    initial="initial"
    animate="animate"
    className={className}
  >
    {children.map((child, index) => (
      <motion.div key={index} variants={animationPresets.staggerItem}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);

// Loading Animation
export const LoadingDots = ({ size = 4, color = "#37ff14" }) => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`w-${size} h-${size} bg-current rounded-full`}
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

// Success Animation
export const SuccessCheckmark = ({ size = 24, color = "#39ff14" }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
  >
    <motion.path
      d="M5 13l4 4L19 7"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      fill="none"
    />
  </motion.svg>
);

// Notification Toast Animation
export const ToastNotification = ({ children, type = "success", onClose }) => {
  const colors = {
    success: "border-neon/30 bg-neon/10",
    error: "border-red-500/30 bg-red-500/10",
    warning: "border-yellow-500/30 bg-yellow-500/10",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-xl ${colors[type]}`}
      >
        <div className="flex items-center space-x-3">
          {type === "success" && <SuccessCheckmark size={20} />}
          <span className="text-white">{children}</span>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white"
          >
            ×
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default {
  animationPresets,
  AnimatedCard,
  AnimatedButton,
  AnimatedInput,
  AnimatedIcon,
  PageTransition,
  StaggerContainer,
  LoadingDots,
  SuccessCheckmark,
  ToastNotification,
};
