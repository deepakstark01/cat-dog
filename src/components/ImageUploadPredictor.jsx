// // ImageUploadPredictor.js (continued)
// import React, { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { UploadArea } from './UploadArea';
// import { PredictionResult } from './PredictionResult';
// import { ExampleImages } from './ExampleImages';
// import { ErrorMessage } from './ErrorMessage';
// import { PrimaryButton } from './PrimaryButton';

// // Example images (replace with your own placeholders)
// const exampleImages = [
//   { src: "./dog.png", alt: "Example dog", label: "Dog" },
//   { src: "./cat.jpg", alt: "Example cat", label: "Cat" }
// ];

// export default function ImageUploadPredictor() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [label, setLabel] = useState(null);
//   const [confidence, setConfidence] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   function handleFileChange(e) {
//     setError(null);
//     setLabel(null);
//     setConfidence(null);
    
//     const selected = e.target.files?.[0] ?? null;
//     setFile(selected);
    
//     if (selected) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPreview(e.target?.result);
//       };
//       reader.readAsDataURL(selected);
//     } else {
//       setPreview(null);
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
    
//     if (!file) {
//       setError('Please select an image to upload.');
//       return;
//     }
    
//     setIsLoading(true);
    
//     const form = new FormData();
//     form.append('file', file);
    
//     try {
//       const res = await fetch(`https://cat-dog-api.onrender.com/predict`, {
//         method: 'POST',
//         body: form,
//       });
      
//       if (!res.ok) throw new Error(await res.text());
      
//       const data = await res.json();
//       setLabel(data['label']);
//       setConfidence(data['confidence']);
//     } catch (err) {
//       setError(err.message || 'Prediction failed.');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function handleBrowseClick() {
//     fileInputRef.current?.click();
//   }

//   function resetPreview() {
//     setFile(null);
//     setPreview(null);
//     setLabel(null);
//     setConfidence(null);
//   }

//   function handleExampleImageClick(src, label) {
//     setPreview(src);
//     setLabel(label);
//     setConfidence(0.95); // Mock confidence for example
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden m-8"
//     >
//       <div className="p-8">
//         <motion.h2 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-2xl font-bold mb-6 text-white text-center"
//         >
//           Dog vs Cat Predictor
//         </motion.h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <UploadArea 
//             preview={preview}
//             fileInputRef={fileInputRef}
//             handleFileChange={handleFileChange}
//             handleBrowseClick={handleBrowseClick}
//             resetPreview={resetPreview}
//           />
          
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <PrimaryButton
//               type="submit"
//               disabled={!file || isLoading}
//               isLoading={isLoading}
//             >
//               Predict
//             </PrimaryButton>
//           </motion.div>
//         </form>
        
//         <ErrorMessage error={error} />
        
//         <PredictionResult 
//           label={label} 
//           confidence={confidence}
//         />
//       </div>

//       <ExampleImages 
//         images={exampleImages} 
//         onSelectImage={handleExampleImageClick} 
//       />
//     </motion.div>
//   );
// }


// ImageUploadPredictor.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadArea } from './UploadArea';
import { PredictionResult } from './PredictionResult';
import { ErrorMessage } from './ErrorMessage';
import { PrimaryButton } from './PrimaryButton';

// Example images
const exampleImages = [
  { src: "./dog.png", alt: "Example dog", label: "Dog" },
  { src: "./cat.jpg", alt: "Example cat", label: "Cat" }
];

// Additional example images for more options
const additionalExamples = [
  { src: "./dog2.png", alt: "Example dog 2", label: "Dog" },
  { src: "./cat2.jpg", alt: "Example cat 2", label: "Cat" }
];

export default function ImageUploadPredictor() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [label, setLabel] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllExamples, setShowAllExamples] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'examples'
  const [animationComplete, setAnimationComplete] = useState(false);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // Track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if we're on mobile based on window width
  const isMobile = windowWidth < 768;

  function handleFileChange(e) {
    setError(null);
    setLabel(null);
    setConfidence(null);
    
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    
    if (selected) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }
    
    setIsLoading(true);
    
    const form = new FormData();
    form.append('file', file);
    
    try {
      const res = await fetch(`https://cat-dog-api.onrender.com/predict`, {
        method: 'POST',
        body: form,
      });
      
      if (!res.ok) throw new Error(await res.text());
      
      const data = await res.json();
      setLabel(data['label']);
      setConfidence(data['confidence']);

      // Scroll to the results area on mobile
      if (isMobile && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      setError(err.message || 'Prediction failed.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleBrowseClick() {
    fileInputRef.current?.click();
  }

  function resetPreview() {
    setFile(null);
    setPreview(null);
    setLabel(null);
    setConfidence(null);
  }

  function handleExampleImageClick(src, label) {
    resetPreview();
    setPreview(src);
    setLabel(label);
    setConfidence(0.95); // Mock confidence for example
    
    // Auto-scroll on mobile
    if (isMobile && containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Toggle extra examples
  function toggleExamples() {
    setShowAllExamples(!showAllExamples);
  }

  // Animation complete handler
  function onAnimationComplete() {
    setAnimationComplete(true);
  }

  // Get all examples based on toggle state
  const allExamples = showAllExamples 
    ? [...exampleImages, ...additionalExamples]
    : exampleImages;

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={onAnimationComplete}
        className="w-full bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700"
      >
        {/* Header section with title and tab navigation on mobile */}
        <div className="px-8 py-6 bg-gradient-to-r from-blue-900/40 via-gray-800 to-purple-900/40 border-b border-gray-700">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center md:text-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Pet Vision
              </span> AI
            </h2>
            <p className="text-gray-400 text-sm mt-2 text-center md:text-left">
              Advanced dog & cat detection powered by machine learning
            </p>
          </motion.div>
          
          {/* Tab navigation for mobile */}
          <div className="md:hidden mt-5 flex border border-gray-600 rounded-lg overflow-hidden">
            <button 
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'upload' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Upload
            </button>
            <button 
              onClick={() => setActiveTab('examples')}
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'examples' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Examples
            </button>
          </div>
        </div>

        {/* Main content area with responsive layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left side: Upload and examples (mobile: conditionally visible, desktop: always visible) */}
          <AnimatePresence mode="wait">
            {(activeTab === 'upload' || !isMobile) && (
              <motion.div 
                key="upload-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-3/5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-700"
              >
                <div className="flex flex-col h-full">
                  {/* Upload Area Container */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Your Image
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="max-h-60 overflow-hidden">
                        <UploadArea
                          preview={preview}
                          fileInputRef={fileInputRef}
                          handleFileChange={handleFileChange}
                          handleBrowseClick={handleBrowseClick}
                          resetPreview={resetPreview}
                        />
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-3 mt-3"
                      >
                        <PrimaryButton
                          type="submit"
                          disabled={!file || isLoading}
                          isLoading={isLoading}
                          className="flex-grow"
                        >
                          {isLoading ? "Processing..." : "Identify Pet"}
                        </PrimaryButton>
                        
                        {preview && (
                          <button
                            type="button"
                            onClick={resetPreview}
                            className="px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                          >
                            Reset
                          </button>
                        )}
                      </motion.div>
                    </form>
                    
                    <ErrorMessage error={error} />
                  </div>
                  
                  {/* Desktop-only Examples Section - Hidden when showing results on mobile */}
                  <div className={`mt-6 hidden md:block`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-medium text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Try with Examples
                      </h3>
                      <button 
                        onClick={toggleExamples} 
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {showAllExamples ? "Show Less" : "Show More"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                      {allExamples.map((image, index) => (
                        <motion.div
                          key={index}
                          onClick={() => handleExampleImageClick(image.src, image.label)}
                          className="relative rounded-lg overflow-hidden cursor-pointer group border border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                          <div className="h-20">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-0"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-1.5 transform translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300 z-20">
                            <p className="text-white font-medium text-xs">{image.label}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mobile-only Examples Tab */}
            {activeTab === 'examples' && isMobile && (
              <motion.div 
                key="examples-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Select an Example
                  </h3>
                  <button 
                    onClick={toggleExamples} 
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {showAllExamples ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {allExamples.map((image, index) => (
                      <motion.div
                      key={index}
                      onClick={() => {
                        handleExampleImageClick(image.src, image.label);
                        // Switch to upload tab after selecting example on mobile
                        setActiveTab('upload');
                      }}
                      className="relative rounded-lg overflow-hidden cursor-pointer group border border-gray-700"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="h-32">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white font-medium text-xs">{image.label}</p>
                        <p className="text-gray-300 text-[10px] mt-0.5">Tap to select</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right side: Results (mobile: full width, desktop: 40%) */}
          <div className="lg:w-2/5 p-6 md:p-8 flex items-center justify-center">
            {label ? (
              <PredictionResult
                label={label}
                confidence={confidence}
              />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 bg-gray-700/20 rounded-xl border border-gray-700 w-full"
              >
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Ready to Identify</h3>
                <p className="text-gray-400 text-sm">
                  Upload your image or select an example to see AI-powered prediction
                </p>
                <ul className="mt-6 space-y-3 text-sm text-left text-gray-400">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Trained on thousands of pet images</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fast prediction in seconds</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High accuracy confidence score</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements for desktop UI */}
      {animationComplete && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="hidden lg:block absolute -top-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl pointer-events-none"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="hidden lg:block absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl pointer-events-none"
          />
        </>
      )}
    </div>
  );
}