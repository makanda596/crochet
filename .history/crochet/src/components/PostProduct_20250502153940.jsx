import axios from 'axios';
import React, { useState } from "react";
import { FaUpload, FaSpinner, FaCheck, FaTag, FaAlignLeft } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [optionalImage1, setOptionalImage1] = useState(null);
  const [optionalImage2, setOptionalImage2] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImage = (file, setImageFunc) => {
    setError("");
    if (!file?.type.match('image.*')) return setError("Only image files allowed.");
    if (file.size > 5 * 1024 * 1024) return setError("Max size is 5MB.");

    const reader = new FileReader();
    reader.onloadend = () => setImageFunc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImage(e.dataTransfer.files[0], setImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !formData.title || !formData.description || !formData.price) {
      setError("All fields including the main image are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/products/createpost`,
        {
          ...formData,
          image,
          optionalImage1,
          optionalImage2
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess("Post created successfully!");
      setFormData({ title: "", description: "", price: "" });
      setImage(null);
      setOptionalImage1(null);
      setOptionalImage2(null);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col lg:flex-row gap-6">
        {/* Main Image Upload Section */}
        <div
          className={`flex-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {image ? (
            <img src={image} alt="Preview" className="rounded-md w-full h-48 object-cover" />
          ) : (
            <>
              <FaUpload className="text-gray-400 mx-auto text-3xl" />
              <p className="text-sm text-gray-500 mt-2">Drag & drop or click to upload</p>
              <p className="text-xs text-gray-400">JPG, PNG (max 5MB)</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files[0], setImage)}
            className="hidden"
            id="fileInput"
          />
        </div>
        <label htmlFor="fileInput" className="text-sm text-blue-600 hover:underline cursor-pointer block text-center">
          {image ? "Change image" : "Select main image"}
        </label>

        {/* Form Fields Section */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaTag className="mr-2 text-blue-500" /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaAlignLeft className="mr-2 text-blue-500" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Describe your product..."
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <MdOutlineCategory className="mr-2 text-blue-500" /> Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter price"
              required
            />
          </div>
        </div>
      </form>

      {/* Optional Images Section */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Optional Image 1 */}
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700">Optional Image 1</label>
          {optionalImage1 && (
            <img src={optionalImage1} alt="Optional 1 Preview" className="rounded-md w-full h-32 object-cover mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files[0], setOptionalImage1)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Optional Image 2 */}
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700">Optional Image 2</label>
          {optionalImage2 && (
            <img src={optionalImage2} alt="Optional 2 Preview" className="rounded-md w-full h-32 object-cover mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files[0], setOptionalImage2)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Error / Success Messages */}
      <div className="mt-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm flex items-center gap-2">
            <FaCheck /> {success}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className={`w-full mt-4 flex justify-center items-center py-2 rounded-md text-white font-semibold
            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Creating...
            </>
          ) : (
            "Create Post"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
