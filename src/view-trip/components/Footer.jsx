import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        <h2 className="text-xl font-semibold mb-3">
          Designed & Developed by <span className="text-white">Akshaj Bansal</span>
        </h2>
        <p className="text-sm max-w-lg mb-6">
          This AI Travel Planner app helps you organize your trips, find the best places to visit, and stay at the finest hotels. Make every journey unforgettable!
        </p>
        <div className="flex space-x-6 text-2xl mb-6">
          <a href="https://www.facebook.com/akshaj.bansal.9" className="hover:text-blue-500 transition-transform transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://github.com/0AkshajBansal0" className="hover:text-gray-400 transition-transform transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/akshajbansal" className="hover:text-pink-500 transition-transform transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/akshaj-bansal-44a6211b8" className="hover:text-blue-400 transition-transform transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
        <div className="mt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Akshaj Bansal. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Icons by <a href="https://react-icons.github.io/react-icons" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">React Icons</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
