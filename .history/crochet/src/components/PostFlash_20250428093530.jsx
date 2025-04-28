import axios from 'axios';
import React, { useState } from "react";
import { FaUpload, FaSpinner, FaCheck, FaTag, FaAlignLeft } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";

const CreatePost = () => {
  // ... (keep all the existing state and logic the same)

  return (
    <div className="w-full max-w-4xl mx-auto mt-2 p-2 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-2">Create New Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row lg:gap-8 gap-4">
        {/* Left Column - Image Upload */}
        <div className="lg:w-1/2">
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition 
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {image ? (
              <img src={image} alt="Preview" className="rounded-md w-full h-64 object-cover" />
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
          <label htmlFor="fileInput" className="text-sm text-blue-600 hover:underline cursor-pointer block text-center mt-2">
            {image ? "Change image" : "Select an image"}
          </label>
        </div>

        {/* Right Column - Form Content */}
        <div className="lg:w-1/2 space-y-4">
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

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Error/Success Messages */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm flex items-center gap-2">
              <FaCheck /> {success}
            </p>
          )}

          {/* Submit Button */}
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
        </div>
      </form>
    </div>
  );
};

export default CreatePost;