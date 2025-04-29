import React, { useState } from 'react';
import OrderFormModal from './OrderFormModal';
import { useAuthStore } from '../utilis/auth';

const AddOrder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getOrders } = useAuthStore(); // getOrders from zustand

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOrderCreated = async () => {
        await getOrders();           // refresh orders
        closeModal();                // close the modal
    };

    return (
        <div className="flex items-center">
            <button
                onClick={openModal}
                className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition duration-200"
            >
                + Add Order
            </button>

            {isModalOpen && (
                <OrderFormModal
                    closeModal={closeModal}
                    onOrderCreated={handleOrderCreated}
                />
            )}
        </div>
    );
};

export default AddOrder;
