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

        {/* Compact Badges */}
        <div className="absolute top-1 left-1 flex gap-1">
          {product.stock < 10 && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
              Low Stock
            </span>
          )}
          {product.discount && (
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
              -{product.discount}%
            </span>
          )}
        </div>
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
            ${product.price}
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

        {/* Compact Rating */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 fill-current ${i < product.rating ? 'text-amber-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <button className="text-purple-600 hover:text-purple-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
