import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-crochet.jpg';
  };

  return (
    <article className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || '/placeholder-crochet.jpg'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

       

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/90 text-purple-600 py-2 rounded-lg backdrop-blur-sm hover:bg-white transition-all">
              <FiShoppingCart className="w-5 h-5" />
              <span className="font-medium text-sm">Quick Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Category Tag */}
        <span className="inline-block text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description.length > 20 ? (<p>{product.description.slice(0, 20)}...</p>) : (<p>{product.description.lenght}</p>)}
        </p>

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            KSH {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              KSH {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/Oneproduct/${product._id}`}
          className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          <FiEye className="w-5 h-5" />
          <span>View Product</span>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;