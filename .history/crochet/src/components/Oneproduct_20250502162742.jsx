import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiMessageCircle, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/Navbar.jsx';
import Viewed from './Viewed.jsx';
import Footer from '../components/Footer';

const Oneproduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const { productId } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/Oneproduct/${productId}`
      );
      const data = response.data;

      // Normalize optional images
      const optionalImages = [];
      if (data.optionalImage) optionalImages.push(data.optionalImage);
      if (data.optionalImage2) optionalImages.push(data.optionalImage2);
      // Add more if needed

      setProduct({ ...data, optionalImages });
      setMainImage(data.image || '/placeholder-crochet.jpg');
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `I'm interested in ordering:\n\n*${product.title}*\nPrice: KSH ${product.price}\n\nDescription: ${product.description.slice(0, 100)}...`
    );
    window.open(`https://wa.me/254748431913?text=${message}`, '_blank');
  };

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
    <div>
      <Navbar />

      <div className="min-h-screen py-14 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="mb-8 inline-flex items-center text-purple-600 hover:text-purple-800">
            <FiArrowLeft className="mr-2" />
            Back to Products
          </Link>

          {product ? (
            <div className="rounded-xl shadow-xl overflow-hidden lg:flex">
              {/* Main Product Image */}
              <div className="lg:w-1/2 p-0 md:p-8">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-4 md:mt-10">
                <h1 className="text-lg font-bold text-gray-900 mb-0">Name: {product.title}</h1>

                <div className="mb-2">
                  <span className="text-lg font-bold text-purple-600">
                    <span className="text-black">Price:</span> KSH {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-3 text-md text-gray-400 line-through">
                      KSH {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-1">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-4 flex items-center">
                  <span className="font-medium text-black mr-4">
                    Availability: <span className="bg-green-500 text-white rounded-lg px-2 py-1">In Stock</span>
                  </span>
                </div>

                <div className="flex flex-row gap-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-32 h-8 bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    Order
                  </button>

                  <button
                    className="w-32 h-8 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Product not found</p>
            </div>
          )}

          {/* Optional Images Section */}
          {product.optionalImages && product.optionalImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Additional Images</h3>
              <div className="flex space-x-4 mt-4">
                {product.optionalImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(img)}
                    className="w-24 h-24 cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Optional Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300 hover:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Viewed />
      </div>

      <Footer />
    </div>
  );
};

export default Oneproduct;

