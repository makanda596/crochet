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

  // Fetch the profile details when the component mounts
  const fetchProfile = async () => {
    if (admin) {
      setFormData({ username: admin.username, password: '', confirmPassword: '' });
    } else {
      // You can handle a case where no admin profile exists, for example by redirecting to login
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
      const response = await axios.put('/api/admin/update', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            minLength="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm your password"
          />
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
