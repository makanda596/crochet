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
    {
      id: 3,
      user: 'John P.',
      rating: 3,
      date: '2024-03-05',
      comment: 'The crochet pillow is lovely, but it arrived later than expected. I would have given 5 stars if the shipping was faster.',
      businessType: 'crochet',
      tags: ['Pillow', 'Shipping Delay']
    },
    {
      id: 4,
      user: 'Jessica K.',
      rating: 5,
      date: '2024-02-28',
      comment: 'Excellent service! My hair was done exactly how I wanted. The salon staff were friendly, and the atmosphere was very relaxing.',
      businessType: 'salon',
      tags: ['Hair Styling', 'Great Staff']
    },
  
  ];

  // Rating summary data
  const ratingSummary = {
    average: 4.3,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      </div>
    </section>
  );
};

export default ReviewSection;
