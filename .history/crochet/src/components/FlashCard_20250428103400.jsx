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
    <article className="flex flex-col w-48 md:w-52 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">

      {/* Image Section */}
      <Link
        to={`/Oneproduct/${product._id}`} className="relative">
        <img
          src={product.image || '/placeholder-crochet.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Info Section */}
      <div className="flex-1 p-2 flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title}
        </h3>

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-lg">KSh {product.price.toLocaleString()}</span>
            {product.oldprice && (
              <span className="text-gray-400 text-sm line-through">
                KSh {product.oldprice}
              </span>
            )}
          </div>


        
        </div>

     
      </div>
    </article>
  );
};

export default FlashCard;
