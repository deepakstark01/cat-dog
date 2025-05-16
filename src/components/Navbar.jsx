// Navbar.js
import React from 'react';
import { Github } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700/70 bg-gray-900/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white sm:inline-block text-lg">
              PetVision AI
            </span>
            <span className="text-xs text-gray-400">Dog &amp; Cat Detector</span>
          </div>
        </a>
        
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/" active>Home</NavLink>
   
        
        </nav>
        
        <div className="flex items-center gap-2">
          <a className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors" href="https://github.com/deepakstark01">
            <Github className="h-5 w-5" />
          </a>
          
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children, active }) {
  return (
    <a 
      href={href} 
      className={`relative px-3 py-2 text-sm font-medium transition-colors 
        ${active 
          ? "text-white" 
          : "text-gray-300 hover:text-white"
        }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-[17px] left-0 right-0 h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"></span>
      )}
    </a>
  );
}