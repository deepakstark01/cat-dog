// Footer.jsx
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Youtube } from 'lucide-react';

// Define Icons object for the social icons
const Icons = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  x: <Twitter className="h-4 w-4" />, // Using Twitter icon for X
  youtube: <Youtube className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />
};

// Contact information
const contact = {
  email: "rohit45deepak@gmail.com",
  tel: "+917460021388",
  social: {
    GitHub: {
      name: "GitHub",
      url: "https://github.com/deepakstark01",
      icon: Icons.github,
      navbar: true,
    },
    LinkedIn: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/deepakstark01/",
      icon: Icons.linkedin,
      navbar: true,
    },
    X: {
      name: "X",
      url: "https://x.com/SkipperArjun",
      icon: Icons.x,
      navbar: true,
    },
    Youtube: {
      name: "Youtube",
      url: "https://www.youtube.com/@FukrayCoder",
      icon: Icons.youtube,
      navbar: true,
    },
    email: {
      name: "Send Email",
      url: "mailto:deepakstark0001@gmail.com",
      icon: Icons.email,
      navbar: false,
    },
  }
};

export function Footer() {
  return (
    <footer className="border-t border-gray-700/50 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* About Section */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-white text-lg">PetVision AI</span>
            </a>
            <p className="text-gray-400 text-sm mb-4">
              Advanced AI-powered dog and cat image detection with high accuracy and instant results.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <a href={`mailto:${contact.email}`} className="hover:text-blue-400 transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contact.tel}`} className="hover:text-blue-400 transition-colors">
                  {contact.tel}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-4">
              <h4 className="text-gray-300 text-sm mb-3">Connect With Me</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(contact.social).map(([key, social]) => (
                  <SocialLink 
                    key={key} 
                    href={social.url} 
                    icon={social.icon} 
                    label={social.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700/30 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-center text-sm text-gray-400 mb-4 sm:mb-0">
            Made with ❤️ by <span className="text-blue-400 font-medium">Deepak</span>
          </p>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PetVision AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}