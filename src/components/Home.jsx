// Home.js
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import ImageUploadPredictor from './ImageUploadPredictor';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center py-12">
        <div className="container">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Pet Vision AI
            </h1>
            <p className="text-gray-300 text-lg">
              Instantly identify dogs and cats in images with our cutting-edge AI model
            </p>
          </div>
          
          <div className="flex justify-center">
            <ImageUploadPredictor />
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="mb-4 w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Upload</h3>
                <p className="text-gray-400 text-sm">
                  Upload any image containing a dog or cat from your device.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="mb-4 w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Process</h3>
                <p className="text-gray-400 text-sm">
                  Our AI model analyzes the image using deep learning techniques.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="mb-4 w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Result</h3>
                <p className="text-gray-400 text-sm">
                  Get instant prediction with confidence level in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;