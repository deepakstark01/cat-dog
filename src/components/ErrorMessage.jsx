// ErrorMessage.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ErrorMessage({ error }) {
  if (!error) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-4 p-4 bg-gradient-to-r from-red-900/50 to-red-800/50 text-red-200 rounded-lg text-sm backdrop-blur-sm border border-red-800/50 flex items-start"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{error}</span>
      </motion.div>
    </AnimatePresence>
  );
}