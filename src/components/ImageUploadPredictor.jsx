// ImageUploadPredictor.js (continued)
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadArea } from './UploadArea';
import { PredictionResult } from './PredictionResult';
import { ExampleImages } from './ExampleImages';
import { ErrorMessage } from './ErrorMessage';
import { PrimaryButton } from './PrimaryButton';

// Example images (replace with your own placeholders)
const exampleImages = [
  { src: "/api/placeholder/400/400", alt: "Example dog", label: "Dog" },
  { src: "/api/placeholder/400/400", alt: "Example cat", label: "Cat" }
];

export default function ImageUploadPredictor() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [label, setLabel] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

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
    setPreview(src);
    setLabel(label);
    setConfidence(0.95); // Mock confidence for example
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden m-8"
    >
      <div className="p-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-6 text-white text-center"
        >
          Dog vs Cat Predictor
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <UploadArea 
            preview={preview}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleBrowseClick={handleBrowseClick}
            resetPreview={resetPreview}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <PrimaryButton
              type="submit"
              disabled={!file || isLoading}
              isLoading={isLoading}
            >
              Predict
            </PrimaryButton>
          </motion.div>
        </form>
        
        <ErrorMessage error={error} />
        
        <PredictionResult 
          label={label} 
          confidence={confidence}
        />
      </div>

      <ExampleImages 
        images={exampleImages} 
        onSelectImage={handleExampleImageClick} 
      />
    </motion.div>
  );
}