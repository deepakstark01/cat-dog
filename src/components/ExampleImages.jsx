// ExampleImages.js
import React from 'react';
import { motion } from 'framer-motion';

export function ExampleImages({ images, onSelectImage }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 border-t border-gray-600"
    >
      <p className="text-gray-300 text-sm mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Try with example images:</span>
      </p>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            onClick={() => onSelectImage(image.src, image.label)}
            className="relative rounded-lg overflow-hidden cursor-pointer group h-36"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            {/* Regular img for React projects */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 z-20">
              <p className="text-white font-medium text-sm">{image.label}</p>
              <p className="text-gray-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to test</p>
            </div>
            <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}