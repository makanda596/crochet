import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OneProductFlashSale = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/OneFlash/${productId}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product deleted successfully!');
      navigate('/'); // Redirect after deletion
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product.');
    }
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
        <Link to="/" className="mt-2 text-purple-600 hover:underline">
          <FiArrowLeft className="inline mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen py-8 px-0 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="mb-2 inline-flex items-center text-purple-600 hover:text-purple-800">
            <FiArrowLeft className="mr-2" />
            Back to Products
          </Link>

          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Flash Sale for <span className="text-purple-600">{product.title}</span>
          </h1>

          {product ? (
            <div className="rounded-xl shadow-xl overflow-hidden lg:flex">
              {/* Product Image */}
              <div className="lg:w-1/2 p-0 md:p-8">
                <img
                  src={product.image || '/placeholder-crochet.jpg'}
                  alt={product.title}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-4 md:mt-10">
                <h1 className="text-lg font-bold text-gray-900 mb-0">{product.title}</h1>

                <div className="mb-0">
                  <span className="text-md font-bold text-green-600">
                    <span className='text-black '>Sale Price:</span> KSH {product.price.toLocaleString()}
                  </span>

                  {product.originalPrice && (
                    <span className="ml-3 text-md text-gray-400 line-through">
                      KSH {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <span className="text-gray-500 text-sm line-through">KSh {product.oldprice}</span>

                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-0">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div className="mb-4 flex items-center">
                  <span className="font-medium text-black mr-4">
                    Availability: <span className='bg-green-300 rounded-lg text-white p-1'>In Stock</span>
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="w-32 h-8 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Product not found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OneProductFlashSale;
