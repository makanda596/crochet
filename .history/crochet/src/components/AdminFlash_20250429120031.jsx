import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../utilis/auth';
import OneItem from '../pages/OneItem'

const AllFlash = () => {
  const { getflashsales, flashsales, loading, error } = useAuthStore();

  useEffect(() => {
    getflashsales();
      }, []);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-96" />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
    

      {/* Error Handling */}
      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <span className="text-red-600 text-2xl">⚠️</span>
          <div>
            <h3 className="text-red-800 font-semibold">Error loading products</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flashsales.map(product => (
          <OneItem
            key={product.id}
            product={product}
            className="transform transition-all hover:scale-105 hover:shadow-xl"
          />
        ))}
      </div>

      {/* Empty State */}
      {flashsales.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🧶</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Flash Sales Available
            </h3>
            <p className="text-gray-500">
              Check back soon for exciting limited-time offers!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFlash;