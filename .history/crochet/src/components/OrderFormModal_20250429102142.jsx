import axios from 'axios';
import React, { useState } from 'react';
import { FiXCircle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import LoadSpinner from './LoadSpinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the styles

const OrderFormModal = ({ closeModal, refreshOrders }) => {
    const [orderData, setOrderData] = useState({
        orderName: '',
        description: '',
        phoneNumber: '',
        amount: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error on input change
    };

    const validateForm = () => {
        if (!orderData.orderName.trim()) {
            return 'Customer name is required';
        }
        if (!/^[0-9]{10,11}$/.test(orderData.phoneNumber)) {
            return 'Invalid phone number';
        }
        if (isNaN(orderData.amount) || parseFloat(orderData.amount) <= 0) {
            return 'Invalid amount';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError); // Show error toast if validation fails
            return setError(validationError);
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/orders/addOrder`,
                orderData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            window.location.reload();

            if (response.data.success) {
                setSuccessMessage('Order created successfully! Page will refresh in 2 seconds.');
                toast.success('Order created successfully!'); // Show success toast
                window.location.reload();
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create order');
            toast.error(error.response?.data?.message || 'Failed to create order'); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bgbackdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-xl w-full max-w-md mx-4 relative shadow-lg">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <FiXCircle size={24} />
                </button>

                <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Add New Order</h2>

                {successMessage ? (
                    <div className="text-center p-8 rounded-md bg-green-100 text-green-700">
                        <FiCheckCircle className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">{successMessage}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-md bg-red-100 text-red-700 flex items-center gap-3">
                                <FiAlertCircle className="flex-shrink-0" size={20} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="orderName" className="block text-sm font-medium text-gray-700 mb-2">
                                Customer Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="orderName"
                                name="orderName"
                                type="text"
                                value={orderData.orderName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
                                placeholder="Enter customer name"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={orderData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
                                rows="3"
                                placeholder="Enter order details"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={orderData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
                                    placeholder="Enter phone number"
                                    pattern="[0-9]{10,11}"
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount (KSh) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={orderData.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
                                    placeholder="Enter amount"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors shadow-sm"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <LoadSpinner size="small" />
                                        Creating...
                                    </div>
                                ) : (
                                    'Create Order'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OrderFormModal;
