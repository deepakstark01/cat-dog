// PredictionResult.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PredictionResult({ label, confidence }) {
  if (!label || confidence === null) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-6 bg-gradient-to-br from-gray-700/40 to-gray-800/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700"
      >
        <motion.div
          className="relative mb-4"
        >
          <motion.div
            className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center shadow-lg relative z-10"
          >
            <span className="text-white text-2xl font-bold">
              {label === "Dog" ? "🐕" : "🐈"}
            </span>
          </motion.div>
        </motion.div>
        
        <motion.p 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-xl mb-4"
        >
          <span className="text-gray-300">It&apos;s a </span>
          <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">{label}</span>
          <span className="text-gray-300">!</span>
        </motion.p>
        
        <div className="mt-4">
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-gray-300">
                  Confidence Level
                </span>
              </div>
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm font-semibold inline-block text-blue-400"
                >
                  {(confidence * 100).toFixed(1)}%
                </motion.span>
              </div>
            </div>
            <div className="overflow-hidden h-3 flex rounded-full bg-gray-600/50 backdrop-blur-sm p-0.5">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${confidence * 100}%` }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  delay: 0.2
                }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </motion.div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-4 text-sm text-gray-400"
          >
            {confidence > 0.9 ? (
              "High confidence prediction! The model is very sure about this."
            ) : confidence > 0.7 ? (
              "Good confidence level. The model is fairly certain."
            ) : (
              "Lower confidence. The image might be ambiguous."
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}