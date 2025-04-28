import React from 'react';
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaPhone,
  FaWhatsapp,
  FaTiktok
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white pt-3 pb-2 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaYarn className="text-3xl text-purple-300" />
              <span className="text-xl font-bold">Yarnhaven</span>
            </div>
            <p className="text-purple-200 text-sm">
              Handmade with love and natural materials. Creating beautiful crochet items since 2021.
            </p>
            <div className="flex gap-4 mt-4">
                        <a
                          href="https://wa.me/254715850722"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-green-400 transition duration-300"
                          aria-label="WhatsApp"
                        >
                          <FaWhatsapp className="h-4 w-4" />
                        </a>
                        <a
                          href="tel:+254715850722"
                          className="text-white hover:text-blue-300 transition duration-300"
                          aria-label="Call"
                        >
                          <FaPhone className="h-4 w-4" />
                        </a>
            
                        <a
                          href="https://www.tiktok.com/@yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-pink-300 transition duration-300"
                          aria-label="TikTok"
                        >
                          <FaTiktok className="h-4 w-4" />
                        </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Shop</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Patterns</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="space-y-2 text-purple-200">
              <p>123 Yarn Street</p>
              <p>Needle City, CC 45678</p>
              <p>Email: hello@crochetcraft.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-purple-200">
              Subscribe for patterns, discounts, and crafting tips!
            </p>
            <form className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-purple-300">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} CrochetCraft. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;