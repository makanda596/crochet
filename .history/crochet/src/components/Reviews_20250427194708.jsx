import React from 'react';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';

const ReviewSection = () => {
  // Sample reviews (replace with real data)
  const reviews = [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: '2024-03-15',
      comment: 'Beautiful handmade crochet blanket! The quality is exceptional and it arrived faster than expected. Will definitely order again!',
      businessType: 'crochet',
      tags: ['Blanket', 'Fast Shipping']
    },
    {
      id: 2,
      user: 'Emma L.',
      rating: 4,
      date: '2024-03-10',
      comment: 'Amazing haircut and coloring service! The stylists really listened to what I wanted and gave me perfect summer highlights.',
      businessType: 'salon',
      tags: ['Haircut', 'Coloring']
    },
    // Add more reviews...
  ];

  // Rating summary data
  const ratingSummary = {
    average: 4.8,
    totalReviews: 142,
    aspects: {
      crochet: ['Quality', 'Communication', 'Shipping'],
      salon: ['Skill', 'Cleanliness', 'Consultation']
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(ratingSummary.average) ? 'text-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {ratingSummary.average} ({ratingSummary.totalReviews} reviews)
            </span>
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaUserCircle className="w-10 h-10 text-purple-600" />
                <div>
                  <h3 className="font-semibold">{review.user}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-3">{review.comment}</p>
              
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rating Breakdown */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">
            Rating Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ratingSummary.aspects.crochet.map((aspect) => (
              <div key={aspect} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">{aspect}</span>
                  <span className="text-purple-800">4.9/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: '98%' }}
                  />
                </div>
              </div>
            ))}
            {ratingSummary.aspects.salon.map((aspect) => (
              <div key={aspect} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">{aspect}</span>
                  <span className="text-purple-800">4.7/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: '94%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white border border-purple-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">
            Share Your Experience
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Rating</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Business Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="businessType" value="crochet" />
                  Crochet
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="businessType" value="salon" />
                  Salon
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;