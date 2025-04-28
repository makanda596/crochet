import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  FiShoppingCart,
  FiMessageCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiLoader2,
  FiAlertTriangle
} from 'react-icons/fi';
import Viewed from './Viewed.jsx'; // Assuming this is a component in the same directory

const Oneproduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/Oneproduct/${productId}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = encodeURIComponent(
      `I'm interested in ordering:\n\n*${product.title}*\nPrice: KSH ${product.price.toLocaleString()}\n\nDescription: ${product.description.slice(0, 100)}...`
    );
    window.open(`https://wa.me/254715850722?text=${message}`, '_blank');
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <FiLoader2 className="animate-spin h-12 w-12 text-purple-500" />
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 max-w-2xl">
          <FiAlertTriangle className="h-6 w-6 text-red-500" />
          <div className="flex-1">
            <p className="text-lg font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors flex items-center">
            <FiArrowLeft className="mr-1" />
            Back
          </Link>
        </div>
      </div>
    );
  }

  // Product not found state (optional, but good to have)
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-xl text-gray-600">Product not found</p>
          <Link to="/" className="mt-4 text-purple-600 hover:text-purple-800 transition-colors flex items-center justify-center">
            <FiArrowLeft className="mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="mb-8 inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
          <FiArrowLeft className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden lg:flex">
          {/* Product Image */}
          <div className="lg:w-1/2 p-0 md:p-8 flex items-center justify-center">
            <img
              src={product.image || '/placeholder-crochet.jpg'}
              alt={product.title}
              className="w-full max-h-[400px] object-contain rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>

            <div className="mb-4">
              <span className="text-2xl font-semibold text-purple-600">
                KSH {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-gray-400 line-through">
                  KSH {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-4">
              <span className="font-medium text-gray-700 flex items-center gap-1">
                Availability:
                {product.stock > 0 ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FiCheckCircle className="h-4 w-4" />
                    In Stock ({product.stock} Available)
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </span>
                )}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleWhatsAppOrder}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center w-full sm:w-auto"
              >
                <FiMessageCircle className="mr-2 h-5 w-5" />
                Order on WhatsApp
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center w-full sm:w-auto">
                <FiShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-gray-600">Category</dt>
                  <dd className="font-medium text-gray-900">{product.category || 'Handmade Crochet'}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Material</dt>
                  <dd className="font-medium text-gray-900">{product.material || 'Premium Yarn'}</dd>
                </div>
                {product.size && (
                  <div>
                    <dt className="text-gray-600">Size</dt>
                    <dd className="font-medium text-gray-900">{product.size}</dd>
                  </div>
                )}
                {product.color && (
                  <div>
                    <dt className="text-gray-600">Color</dt>
                    <dd className="font-medium text-gray-900">{product.color}</dd>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Viewed />
      </div>
    </div>
  );
};

export default Oneproduct;
