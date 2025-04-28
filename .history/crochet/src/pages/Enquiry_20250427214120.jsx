import React, { useState } from 'react';
import { FiUser, FiMessageSquare, FiPhone } from 'react-icons/fi';

const InquiryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phoneNumber: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = new FormData();
        form.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
        form.append('subject', 'New Product Inquiry');
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('phoneNumber', formData.phoneNumber);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
            if (data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', description: '', phoneNumber: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Product Inquiry Form
                    </h2>

                    {submitStatus === 'success' && (
                        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                            Inquiry submitted successfully!
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
                            Error submitting inquiry. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiryPage;
