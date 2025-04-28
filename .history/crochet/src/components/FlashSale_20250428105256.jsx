import React, { useEffect } from 'react';
import { useAuthStore } from '../utilis/auth';
import LoadSpinner from './LoadSpinner';
import FlashCard from './FlashCard';

const FlashSale = () => {
  const { getflashsales, flashsales, loading, error } = useAuthStore();

  useEffect(() => {
    getflashsales();
  }, []);

  if (loading) return <LoadSpinner />;

  return (
    <section className="space-y-6">
      {/* Flash Sale Header */}
      <div className="flex items-center justify-between bg-red-600 text-white px-4 py-2 rounded-md">
        <h2 className="text-lg font-bold">
          🔥 Flash Sales | Live Now
        </h2>
        {/* Timer (static for now) */}
        <div className="text-sm font-semibold">
          Time Left: <span className="font-mono">00h : 23m : 46s</span>
        </div>
        <button className="text-sm underline">
          See All ➔
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Flash Sale Products */}
      const FlashCard = ({product}) => {
  return (
      <div className="p-4 flex flex-col items-center bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.description.slice(0, 80)}...</p>
        <div className="text-lg font-semibold text-purple-600 mb-2">KSH {product.price}</div>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Buy Now
        </button>
      </div>
      );
};

    </section>
  );
};

export default FlashSale;
