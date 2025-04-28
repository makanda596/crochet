import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiMessageCircle, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Viewed from './Viewed.jsx'

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
    const message = encodeURIComponent(
      `I'm interested in ordering:\n\n*${product.title}*\nPrice: KSH ${product.price}\n\nDescription: ${product.description.slice(0, 100)}...`
    );
    window.open(`https://wa.me/254715850722?text=${message}`, '_blank');
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p>{error}</p>
        <Link to="/" className="mt-4 text-purple-600 hover:underline">
          <FiArrowLeft className="inline mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-0 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="mb-8 inline-flex items-center text-purple-600 hover:text-purple-800">
          <FiArrowLeft className="mr-2" />
          Back to Products
        </Link>

        {product ? (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden lg:flex">
            {/* Product Image */}
            <div className="lg:w-1/2 p-0 md:p-8">
              <img
                src={product.image || '/placeholder-crochet.jpg'}
                alt={product.title}
                className="w-full h-96  object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-4">
              <h1 className="text-lg font-bold text-gray-900 mb-0">{product.title}</h1>

              <div className="mb-0">
                <span className="text-lg font-bold text-purple-600">
                  KSH {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-md text-gray-400 line-through">
                    KSH {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold mb-0">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-4 flex items-center">
                <span className="font-medium text-gray-700 mr-4">Availability: <span className='bg-green-300 rounded-lg text-white p-2'>In Stock</span></span>
                
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <FiMessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </button>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <FiShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <dt className="text-gray-600">Category</dt>
                    <dd className="font-medium">{product.category || 'Handmade Crochet'}</dd>
                  </div>
                  <div className="col-span-1">
                    <dt className="text-gray-600">Material</dt>
                    <dd className="font-medium">{product.material || 'Premium Yarn'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Product not found</p>
          </div>
        )}
      </div>
      <Viewed/>
    </div>
  );
};

export default Oneproduct;