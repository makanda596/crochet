import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify'; // Import toast for notifications

const Oneproduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/Oneproduct/${productId}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully");
      window.location.href = '/home';  // Redirect to home after successful delete
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // Handle modal form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Show image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit for updating product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    if (productData.image) {
      formData.append('image', productData.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/products/edit/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'  // Handle file uploads
          }
        }
      );

      toast.success('Product updated successfully');
      setShowModal(false);  // Close modal
      fetchProduct();  // Re-fetch the updated product details
    } catch (err) {
      toast.error('Failed to update product');
      console.error('Error:', err);
    }
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
      <div className="min-h-screen py-14 px-0 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="mb-8 inline-flex items-center text-purple-600 hover:text-purple-800">
            <FiArrowLeft className="mr-2" />
            Back to Products
          </Link>

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
                <h1 className="text-lg font-bold text-gray-900 mb-0">Name: {product.title}</h1>

                <div className="mb-0">
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
                  <h3 className="text-md font-semibold mb-0">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => {
                      setProductData({
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        image: product.image
                      });
                      setImagePreview(product.image);
                      setShowModal(true);
                    }}
                    className="w-32 h-8 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-lg font-medium transition-colors"
                  >
                    Edit Product
                  </button>

                  <button
                    onClick={deleteProduct}
                    className="w-32 h-8 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg font-medium transition-colors"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Product not found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for editing product */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Oneproduct;
