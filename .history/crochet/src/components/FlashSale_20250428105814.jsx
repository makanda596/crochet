import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';  // Assuming the FlashCard component is imported

const FlashSales = () => {
  const [flashsales, setFlashsales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Pagination state

  const fetchFlashSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/flashsales?page=${page}&limit=10`);
      setFlashsales((prevSales) => [...prevSales, ...response.data]); // Append new products to existing ones
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch flash sales");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashSales();
  }, [page]); // Fetch products when page changes

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number to load more products
  };

  return (
    <div className="py-8 px-4 md:px-40">
      {/* Grid Section with improved responsiveness and padding */}
      <p className="text-2xl font-semibold text-gray-800 mb-4">Flash Sales</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8">
        {flashsales.length > 0 ? (
          flashsales.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FlashCard key={product._id} product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            <div className="flex justify-center items-center">
              <span className="text-xl mr-2">🚫</span>
              <span>No products found</span>
            </div>
          </div>
        )}
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <button
            onClick={handleViewMore}
            className="py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashSales;
