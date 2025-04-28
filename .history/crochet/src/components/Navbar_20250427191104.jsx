import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-purple-800 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">🧶 CrochetCraft</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="/" 
              className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Home
            </a>
            <a 
              href="/enquiry" 
              className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Enquiry
            </a>
            <a 
              href="/contact" 
              className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;