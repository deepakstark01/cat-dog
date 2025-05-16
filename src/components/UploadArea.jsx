// UploadArea.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function UploadArea({
  preview,
  fileInputRef,
  handleFileChange,
  handleBrowseClick,
  resetPreview
}) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-lg overflow-hidden border-2 border-blue-500 border-dashed group"
            style={{ height: '250px' }} // Fixed height instead of aspect ratio
          >
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain bg-gray-900" // Changed to object-contain
              style={{ maxHeight: '100%' }} // Ensure image stays within bounds
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <button 
              type="button"
              onClick={resetPreview}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors transform hover:scale-110 shadow-lg z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Resize handle for mobile */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-1 bg-black/50 text-white text-xs">
              <span>Preview</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group border-2 border-dashed border-gray-500 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-300"
            onClick={handleBrowseClick}
            style={{ height: '250px' }} // Fixed height to match preview
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center h-full space-y-3 cursor-pointer">
              <div className="relative w-16 h-16 mb-2">
                <motion.div 
                  className="absolute inset-0 bg-blue-500/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <p className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">Click to upload an image</p>
              <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors duration-300">or drag and drop</p>
              <motion.div 
                className="px-4 py-1.5 mt-2 bg-blue-600/20 rounded-full text-blue-400 text-sm max-w-fit mx-auto"
                whileHover={{
                  backgroundColor: "rgba(37, 99, 235, 0.3)",
                  scale: 1.05,
                }}
              >
                Browse files
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}