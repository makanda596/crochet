import axios from 'axios';
import React, { useState } from 'react';
import { FiXCircle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import LoadSpinner from './LoadSpinner';

const OrderFormModal = ({ closeModal, refreshOrders }) => {
    const [orderData, setOrderData] = useState({
        orderName: '',
        description: '',
        phoneNumber: '',
        amount: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error on input change
    };

    const validateForm = () => {
        if (!orderData.orderName.trim()) return 'Customer name is required';
        if (!orderData.phoneNumber.match(/^[0-9]{10,11}$/)) return 'Invalid phone number';
        if (isNaN(orderData.amount) || orderData.amount <= 0) return 'Invalid amount';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) return setError(validationError);

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/orders/addOrder', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    closeModal();
                    refreshOrders(); // Refresh parent orders list
                }, 1500);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-full max-w-md mx-4 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <FiXCircle size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-purple-600">Add New Order</h2>

                {success ? (
                    <div className="text-center p-8">
                        <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-800">Order created successfully!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
                                <FiAlertCircle className="flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="orderName" className="block text-sm font-medium text-gray-700 mb-1">
                                Customer Name *
                            </label>
                            <input
                                id="orderName"
                                name="orderName"
                                type="text"
                                value={orderData.orderName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={orderData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                rows="2"
                                placeholder="Order details..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={orderData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                    placeholder="08012345678"
                                    pattern="[0-9]{10,11}"
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount (₦) *
                                </label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={orderData.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                    placeholder="5000"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <LoadSpinner size="small" />
                                        Creating...
                                    </>
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