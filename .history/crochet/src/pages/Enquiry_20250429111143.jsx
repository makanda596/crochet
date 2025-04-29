import React, { useState } from 'react';
import axios from 'axios';  // Don't forget to import axios
import { FiUser, FiMessageSquare, FiPhone } from 'react-icons/fi';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';  // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const InquiryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phoneNumber: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form
    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send inquiry to the backend (replace this URL with your actual backend endpoint)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/enquiry/makeEnquiry`, formData);
            toast.success('Inquiry submitted successfully!'0
            if (response.status === 200) {
                toast.success('Inquiry submitted successfully!'); // Show success toast
                setFormData({ name: '', description: '', phoneNumber: '' }); // Reset the form
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting inquiry. Please try again.'); // Show error toast
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white shadow-xl rounded-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Product Inquiry Form
                        </h2>

                        {/* Form Inputs */}
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="+254 700 000 000"
                                />
                            </div>
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Inquiry Details *
                            </label>
                            <div className="relative">
                                <FiMessageSquare className="absolute left-3 top-4 text-gray-400" />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Describe your inquiry in detail..."
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={submit}
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Toast Container for Notifications */}
        </div>
    );
};

export default InquiryPage;
