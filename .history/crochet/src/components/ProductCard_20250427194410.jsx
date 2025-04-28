import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-crochet.jpg';
  };

  return (
    <article className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 overflow-hidden max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full">
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
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.title}
        </h3>
        <p className="text-sm text-gray-700 font-medium flex-1">
          {product.description.length > 20
            ? `${product.description.slice(0, 20)}...` // Slice description if it's longer than 20 characters
            : product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-purple-600">
            KSH: {product.price}
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
