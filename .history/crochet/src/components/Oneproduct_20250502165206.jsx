import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMessageCircle, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/Navbar.jsx';
import Viewed from './Viewed.jsx';
import Footer from '../components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Oneproduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/Oneproduct/${productId}`,
        { signal }
      );

      if (!response.data) throw new Error('Product not found');

      const processImages = (data) => {
        const images = [data.image, data.optionalImage, data.optionalImage1, data.optionalImage2];
        return images.filter(Boolean);
      };

      const productData = {
        ...response.data,
        images: processImages(response.data),
        inStock: response.data.stockQuantity > 0
      };

      setProduct(productData);
      setMainImage(productData.images[0] || '/placeholder-crochet.jpg');
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch product');
        if (err.response?.status === 404) navigate('/not-found');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);
    return () => controller.abort();
  }, [productId]);

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering:\n\n*${product.title}*\nPrice: KSH ${product.price}\n\n${product.description.slice(0, 100)}...`
    );
    window.open(`https://wa.me/254748431913?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
    const btn = document.querySelector('.add-to-cart');
    btn.classList.add('scale-95');
    setTimeout(() => btn.classList.remove('scale-95'), 100);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p className="text-lg font-medium mb-4">{error}</p>
        <Link
          to="/"
          className="mt-4 text-purple-600 hover:text-purple-800 transition-colors flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="mb-2 mt-10 inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Products
          </Link>

          {loading ? (
            <div className="rounded-xl shadow-xl overflow-hidden lg:flex">
              <div className="lg:w-1/2 p-2">
                <Skeleton height={480} className="rounded-lg" />
              </div>
              <div className="lg:w-1/2 p-2 space-y-2">
                <Skeleton width={300} height={32} />
                <Skeleton width={200} height={24} />
                <Skeleton count={4} />
                <Skeleton width={150} height={40} />
              </div>
            </div>
          ) : product ? (
            <div className="rounded-xl shadow-xl overflow-hidden lg:flex bg-white">
              {/* Image Gallery */}
              <section className="lg:w-1/2 p-4" aria-label="Product images">
                <div className="relative aspect-square mb-4">
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-96 object-contain rounded-xl border border-gray-200"
                    onError={(e) => (e.target.src = '/placeholder-crochet.jpg')}
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-4 mt-4 overflow-x-auto">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(img)}
                        className={`w-20 h-20 flex-shrink-0 rounded-xl border-2 overflow-hidden transition-transform duration-200 ${mainImage === img
                            ? 'border-purple-600 scale-105'
                            : 'border-gray-300 hover:border-purple-400'
                          }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = '/placeholder-crochet.jpg')}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* Product Details */}
              <section className="lg:w-1/2 p-6" aria-label="Product details">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-purple-600">
                    KSH {Number(product.price).toLocaleString()}
                  </div>
                  {product.originalPrice && (
                    <div className="text-lg text-gray-400 line-through mt-1">
                      KSH {Number(product.originalPrice).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-8 flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.inStock && product.stockQuantity && (
                    <span className="text-sm text-gray-500">
                      ({product.stockQuantity} available)
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    disabled={!product.inStock}
                  >
                    <FiMessageCircle className="w-5 h-5" />
                    <span>Order via WhatsApp</span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="add-to-cart flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    disabled={!product.inStock}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Product not found</p>
            </div>
          )}
        </div>

        <Viewed className="mt-16" />
      </main>

      <Footer />
    </div>
  );
};

export default Oneproduct;
