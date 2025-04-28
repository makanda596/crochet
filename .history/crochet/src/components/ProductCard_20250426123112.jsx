import React from 'react';

const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img 
      src={product.image} 
      alt={product.name}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
    <p className="text-gray-600 mb-2">${product.price}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Stock: {product.description}
      </span>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
        View Details
      </button>
    </div>
  </div>
);

export default ProductCard;