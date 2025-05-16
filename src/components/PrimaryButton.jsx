// PrimaryButton.js
import React from 'react';

export function PrimaryButton({
  children,
  isLoading,
  className,
  ...props
}) {
  return (
    <button
      className={`w-full px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500
       text-white font-medium rounded-lg
       hover:from-blue-500 hover:to-blue-600
       disabled:from-blue-600/50 disabled:to-blue-500/50 disabled:text-white/70
       disabled:cursor-not-allowed
       transition-all duration-300
       shadow-lg hover:shadow-blue-500/20
       transform hover:-translate-y-0.5
       flex items-center justify-center
       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 gap-2`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}