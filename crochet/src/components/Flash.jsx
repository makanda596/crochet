import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const FlashCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-crochet.jpg';
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/oneItem/${product._id}`} className="flex flex-col  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">

      {/* Image Section */}
      <Link
        to={`/oneItem/${product._id}`} className="relative">
        <img
          src={product.image || '/placeholder-crochet.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
          loading="lazy"
        />

      
      </Link>

      {/* Info Section */}
      <div className="flex-1 p-2 flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title}
        </h3>

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-md">KSh {product.price.toLocaleString()}</span>
            {product.oldprice && (
              <span className="text-gray-500 text-sm line-through">
                KSh {product.oldprice}
              </span>
            )}
          </div>
        </div>

     
      </div>
    </Link>
  );
};

export default FlashCard;
