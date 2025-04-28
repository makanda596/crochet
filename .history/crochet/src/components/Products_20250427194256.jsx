import React, { useEffect } from 'react';
import { useAuthStore } from '../utilis/auth';
import LoadSpinner from './LoadSpinner';
import ProductCard from './ProductCard';

const Products = () => {
  const { getProducts, products, loading, error } = useAuthStore();

  useEffect(() => {
    getProducts();
  }, []); // Add getProducts to dependency array if using eslint

  if (loading) return <LoadSpinner />;

  return (
    <div className="space-y-4 px-2 md:px-20">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-8">
          No products found
        </div>
      )}
    </div>
  );
};

export default Products;