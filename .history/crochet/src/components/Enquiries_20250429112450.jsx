import React, { useEffect, useState } from 'react';
import axios from 'axios';  // For making API requests
import { toast } from 'react-toastify';  // For showing toast notifications
import 'react-toastify/dist/ReactToastify.css';  // Make sure you have the toast CSS

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);  // Store enquiries
  const [isLoading, setIsLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  // Fetch enquiries from backend
  const fetchEnquiries = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/enquiry/getquiry`,
        {},  // Empty body (verifyToken will take care of authentication)
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }  // Ensure the token is passed
      );

      setEnquiries(response.data);  // Set the fetched enquiries
      setIsLoading(false);  // Stop loading state
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setError('Failed to fetch enquiries. Please try again later.');
      setIsLoading(false);  // Stop loading on error
      toast.error('Error fetching enquiries');  // Show error toast
    }
  };

  // Fetch enquiries when the component is mounted
  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading enquiries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-2">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            All Enquiries
          </h2>

          {/* Enquiries List */}
          {enquiries.length === 0 ? (
            <p>No enquiries found.</p>
          ) : (
            <div className="space-y-2">
              {enquiries.map((enquiry) => (
                <div key={enquiry._id} className="bg-gray-100 p-2 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg text-gray-900">{enquiry.name}</h3>
                  <p className="text-gray-700">{enquiry.phoneNumber}</p>
                  <p className="text-gray-500 mt-2">{enquiry.description}</p>
                  <p className="text-gray-400 mt-2 text-sm">
                    <i>Submitted on {new Date(enquiry.createdAt).toLocaleString()}</i>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
