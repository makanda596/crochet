import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Oneproduct = () => {
  const [product, setProduct] = useState(null); // State for the product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { productId } = useParams(); // Get the productId from the URL params

  // Fetch the product data
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/Oneproduct/${productId}`);
      setProduct(response.data); // Set the product data
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setError("Failed to fetch product details"); // Set error message in case of failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(); // Call the function to fetch the product data when the component mounts
  }, [productId]); // Refetch when the productId changes

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there is an error
  }

  // If the product data is available, render it
  return (
    <div className="max-w-4xl mx-auto p-4">
      {product ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex gap-4">
            <img 
              src={product.image || '/placeholder-crochet.jpg'} 
              alt={product.title} 
              className="w-1/3 h-auto object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
              <p className="text-lg font-bold text-purple-600">KSH: {product.price}</p>
              <p className="text-sm text-gray-700 mt-2">
                {product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="font-medium text-gray-600">Stock:</span>
                <span className={`font-bold ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>{product.stock} left</span>
              </div>
              <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No product found.</div>
      )}
    </div>
  );
};

export default Oneproduct;
