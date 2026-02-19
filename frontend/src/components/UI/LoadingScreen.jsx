import React from "react";
import { motion } from "framer-motion";
import AnimatedLogo from "../SVG/AnimatedLogo";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center">
        <AnimatedLogo size={80} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center"
        >
          <h1 className="text-2xl font-bold text-neon animate-glow">
            NairaFlow
          </h1>

          {/* Loading Bar */}
          <div className="mt-4 w-48 h-1 bg-dark-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />
          </div>

          <p className="mt-4 text-gray-500 text-sm">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
