import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; // Import individual icons from react-icons/fa

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State to track if the user has scrolled

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Or any threshold you like
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        bg-purple-800 shadow-lg fixed w-full z-10
        ${scrolled ? 'bg-purple-900/90 backdrop-blur-md transition-colors duration-300' : 'bg-purple-800'}
      `}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">🧶 CrochetCraft</span>
          </div>

          {/* Hamburger Icon (for mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-purple-300 focus:outline-none focus:shadow-outline"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" /> // Close icon when menu is open
              ) : (
                <FaBars className="h-6 w-6" /> // Menu icon when menu is closed
              )}
            </button>
          </div>

          {/* Navigation Links (for desktop) */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="/"
              className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Home
            </a>
            <a
              href="/flash-sales" // adjust the href
              className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Flash Sales
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

          {/* Social Media Links (for desktop) */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://www.instagram.com/" // Replace with your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/" // Replace with your Facebook URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/" // Replace with your Twitter URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default, shown on button click) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3 space-y-1">
          <a
            href="/"
            className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Home
          </a>
          <a
            href="/flash-sales"  // adjust the href
            className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Flash Sales
          </a>
          <a
            href="/enquiry"
            className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Enquiry
          </a>
          <a
            href="/contact"
            className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Contact
          </a>
          {/* Social Media Links (for mobile) */}
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://www.instagram.com/" // Replace with your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/" // Replace with your Facebook URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/" // Replace with your Twitter URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
