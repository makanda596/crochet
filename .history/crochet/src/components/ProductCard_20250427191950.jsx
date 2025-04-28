import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Fallback image for error handling
  const handleImageError = (e) => {
    e.target.src = '/placeholder-crochet.jpg'; // Add your placeholder image path
  };

  return (
    <article className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden">
      {/* Product Image Section */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image || '/placeholder-crochet.jpg'}
          alt={product.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {product.stock < 10 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Almost Gone!
            </span>
          )}
          {product.discount && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Save {product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Title and Price */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Stock Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available:</span>
            <span className={`font-semibold ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
              {product.stock} left
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          to={`/Oneproduct/${product._id}`}
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          View Full Details
        </Link>

        {/* Quick Actions */}
        <div className="flex justify-between items-center text-sm">
          <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>Wishlist</span>
          </button>
          <span className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 fill-current ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;sss