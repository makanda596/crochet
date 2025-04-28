import axios from 'axios';
import React, { useState } from "react";
import { FaUpload, FaSpinner, FaCheck, FaTag, FaAlignLeft } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    oldprice:"",
    price: "",
  }); 
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImage = (file) => {
    setError("");
    if (!file?.type.match('image.*')) return setError("Only image files allowed.");
    if (file.size > 5 * 1024 * 1024) return setError("Max size is 5MB.");

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImage(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !formData.title || !formData.description || !formData.oldprice || !formData.price) {
      setError("All fields including an image are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
       await axios.post(
        'http://localhost:5000/products/createFlash',
        { ...formData, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess("Post created successfully!");
      setFormData({ title: "", description: "", oldprice:"", price: "" });
      setImage(null);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-2 p-2 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-2">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition 
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
            onChange={(e) => handleImage(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
        </div>
        <label htmlFor="fileInput" className="text-sm text-blue-600 hover:underline cursor-pointer block text-center">
          {image ? "Change image" : "Select an image"}
        </label>

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
            <MdOutlineCategory className="mr-2 text-blue-500" /> Old Price
          </label>
          <input
            type="number"
            name="oldprice"
            value={formData.oldprice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter oldprice"
            required
          />
        </div>
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


        {/* Error / Success */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm flex items-center gap-2">
            <FaCheck /> {success}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className={`w-full flex justify-center items-center py-2 rounded-md text-white font-semibold 
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
      </form>
    </div>
  );
};

export default CreatePost;
