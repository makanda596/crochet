import React, { useState } from 'react';
import OrderFormModal from './OrderFormModal';

const AddOrder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Button to open the modal */}
            <button
                onClick={openModal}
                className="px-3 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
            >
                Add Order
            </button>

            {/* Modal */}
            {isModalOpen && <OrderFormModal closeModal={closeModal} />}
        </div>
    );
};

export default AddOrder;
