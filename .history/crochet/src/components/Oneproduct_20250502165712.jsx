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

      <main className="flex-grow py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="mb-4 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm transition-colors"
          >
            <FiArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>

          {loading ? (
            <div className="rounded-lg shadow-sm overflow-hidden lg:flex">
              <div className="lg:w-1/2 p-2">
                <Skeleton height={400} className="rounded-lg" />
              </div>
              <div className="lg:w-1/2 p-4 space-y-3">
                <Skeleton width={240} height={28} />
                <Skeleton width={160} height={20} />
                <Skeleton count={3} />
                <div className="flex gap-3 mt-4">
                  <Skeleton width={120} height={40} />
                  <Skeleton width={120} height={40} />
                </div>
              </div>
            </div>
          ) : product ? (
            <div className="rounded-lg shadow-sm overflow-hidden lg:flex bg-white">
              {/* Image Gallery */}
              <section className="lg:w-1/2 p-4" aria-label="Product images">
                <div className="relative aspect-square mb-4">
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-lg border border-gray-100 transition-opacity duration-200"
                    onError={(e) => (e.target.src = '/placeholder-crochet.jpg')}
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(img)}
                        className={`w-16 h-16 flex-shrink-0 rounded-lg border overflow-hidden transition-all duration-150 ${mainImage === img
                            ? 'border-purple-600 ring-1 ring-purple-600'
                            : 'border-gray-200 hover:border-purple-400'
                          }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = '/placeholder-crochet.jpg')}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* Product Details */}
              <section className="lg:w-1/2 p-2" aria-label="Product details">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.title}
                </h1>

                <div className="mb-2">
                  <div className="text-lg font-bold text-purple-600">
                    KSH {Number(product.price).toLocaleString()}
                  </div>
                  {product.originalPrice && (
                    <div className="text-base text-gray-400 line-through">
                      KSH {Number(product.originalPrice).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h2 className="text-base font-medium mb-2 text-gray-700">Description</h2>
                  <p className="text-gray-600 text-sm leading-normal">
                    {product.description}
                  </p>
                </div>

                <div className="mb-6 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.inStock && product.stockQuantity && (
                    <span className="text-xs text-gray-500">
                      ({product.stockQuantity} available)
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    disabled={!product.inStock}
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="add-to-cart w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    disabled={!product.inStock}
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-base text-gray-600">Product not found</p>
            </div>
          )}
        </div>

        <Viewed className="mt-8" />
      </main>

      <Footer />
    </div>
  );
};

export default Oneproduct;
