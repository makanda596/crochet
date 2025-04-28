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
      <div className="grid grid-cols-1 sm:px-2 md:px-40 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8">
        {flashsales.length > 0 ? (
          flashsales.map(product => (
            <FlashCard key={product._id} product={product} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8 w-full">
            No products found
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSale;
