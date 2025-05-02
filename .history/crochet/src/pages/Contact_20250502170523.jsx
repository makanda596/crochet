import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import {  FaWhatsapp} from 'react-icons/fa'; // Added TikTok icon
const Contact = () => {
  return (
    <div>
      <Navbar/>
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-900">Get in Touch</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <FiMapPin className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Our Office</h3>
                  <p className="text-gray-600">Eldoret<br /> Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiPhone className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Phone Number</h3>
                  <a href="tel:+254748431913" className="text-gray-600 hover:text-purple-600">
                    +254748431913
                  </a>
                </div>
              </div>

              
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Direct WhatsApp</h3>
              <a
                href="https://wa.me/254748431913"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-2 items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                  <FaWhatsapp className="h-6 w-6" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-6"
          >
            <input
              type="hidden"
              name="access_key"
                value="f07646d0-18e9-462c-af68-0d73a710f3b2"
            />
            <input type="hidden" name="subject" value="New Contact Form Submission" />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  required
                  className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Message (Hidden by Default) */}
      <div id="result" className="hidden mt-4 text-center"></div>
    </section>
    <Footer/>
    </div>
  );
};

export default Contact;