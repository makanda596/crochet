import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaYarn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white pt-4 pb-2 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaYarn className="text-xl text-purple-300" />
              <span className="text-xl font-bold">Yarnhaven</span>
            </div>
            <p className="text-purple-200 text-sm">
              Handmade with love and natural materials. Creating beautiful crochet items since 2021.
            </p>
          </div>

          {/* WhatsApp Join Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-purple-200">
              Join our WhatsApp group for patterns, discounts, and crafting tips!
            </p>
            <div className="mt-4">
              <a
                href="https://wa.me/254 748 431913?text=Hi!%20I'd%20like%20to%20join%20the%20Yarnhaven%20WhatsApp%20group."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg inline-block transition-colors"
              >
                Join our WhatsApp Group
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-purple-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="/flashSales" className="text-purple-200 hover:text-white transition-colors">Flash Sales</a></li>
              <li><a href="/enquiry" className="text-purple-200 hover:text-white transition-colors">Enquiry</a></li>
              <li><a href="/contact" className="text-purple-200 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="space-y-2 text-purple-200">
              <p>Eldoret, Kenya</p>
              <p>Email: maryanyega570@gmail.com</p>
              <a
                href="tel:+254715850722"
                className="text-white hover:text-blue-300 transition duration-300"
                aria-label="Call"
              >
                Phone:0748 431913
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-purple-300">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Yarnhaven. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
