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
    <section className="space-y-6 pt-10">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="py-8 px-4 md:px-40">
       <p>Flash Sales</p>
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
      </div>

    </section>
  );
};

export default FlashSale;
