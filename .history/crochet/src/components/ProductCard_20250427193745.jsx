import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-crochet.jpg';
  };

  return (
    <article className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 overflow-hidden">
      {/* Compact Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || '/placeholder-crochet.jpg'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

      
      </div>

      {/* Compact Details */}
      <div className="p-2 space-y-1.5">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold text-purple-600">
            {product.price}KSH:
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Stock:</span>
          <span className={`font-medium ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
            {product.stock} left
          </span>
        </div>

        {/* Compact CTA */}
        <Link
          to={`/Oneproduct/${product._id}`}
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-xs text-center py-1.5 rounded-md font-semibold transition-colors duration-150"
        >
          Quick View
        </Link>

      
        
      </div>
    </article>
  );
};

export default ProductCard;
