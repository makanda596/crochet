import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaFacebook, FaPhone, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      bg-purple-800 shadow-lg fixed w-full z-10
      ${scrolled ? 'bg-purple-900/90 backdrop-blur-md transition-colors duration-300' : 'bg-purple-800'}
    `}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold">🧶 CrochetCraft</span>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-purple-300 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300">Home</a>
            <a href="/enquiry" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300">Enquiry</a>
            <a href="/contact" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300">Contact</a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex space-x-4 items-center">
            <a
              href="https://wa.me/254715850722"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
            <a
              href="tel:+254715850722"
              className="text-white hover:text-blue-300 transition duration-300"
              aria-label="Call"
            >
              <FaPhone className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3 space-y-1">
          <a href="/" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="/enquiry" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">Enquiry</a>
          <a href="/contact" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">Contact</a>

          {/* Mobile Icons */}
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://wa.me/254715850722"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
            <a
              href="tel:+254715850722"
              className="text-white hover:text-blue-300 transition duration-300"
              aria-label="Call"
            >
              <FaPhone className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Facebook"
            >
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
