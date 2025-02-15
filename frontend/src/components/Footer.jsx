import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f0e0e] text-white py-4 px-4">
      <div className="container mx-auto flex flex-col items-center text-center space-y-3">
        <h3 className="font-bold text-2xl">MultiCodeHub</h3>
        <p className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        <p className="text-sm">Developed by Prajwal Majgaonkar</p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/in/prajwal-majgaonkar-2b3515259/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/prajwal200425"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
