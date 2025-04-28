import React from 'react';

const AddOrder = () => {
  // Define a function to handle the order addition
  const handleAddOrder = () => {
    // Logic to add an order (you can replace this with actual logic to add the order)
    console.log('Order added!');
    // You could navigate to another page or show a form here to add an order
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Add New Order</h2>
      {/* Button to trigger order addition */}
      <button
        onClick={handleAddOrder}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
      >
        Add Order
      </button>
    </div>
  );
};

export default AddOrder;
