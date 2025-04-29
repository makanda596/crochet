import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../utilis/auth';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const Settings = () => {
  const { profile, admin, setAdmin } = useAuthStore();  // Assuming you have a setter for the admin in your auth store
  const [formData, setFormData] = useState({
    username: admin?.username || '',  // Initialize with current admin data
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // State for showing/hiding the password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State for showing/hiding confirm password

  // Fetch the profile details when the component mounts
  const fetchProfile = async () => {
    if (admin) {
      setFormData({ username: admin.username, password: '', confirmPassword: '' });
    } else {
      setMessage('No admin profile found. Please log in.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [admin]);

  // Handle input changes for form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission
  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send PUT request to update the admin details
      const token= localStorage.getItem("token")
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}}`, // Get the token from localStorage
        },
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        setAdmin(response.data.admin); // Assuming you store the updated admin info in your store
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

      {/* Display any message if exists */}
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}

      <form onSubmit={submit}>
        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter new username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}  // Toggle between text and password
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}  // Toggle show/hide password
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}  // Toggle between text and password
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            minLength="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}  // Toggle show/hide confirm password
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
