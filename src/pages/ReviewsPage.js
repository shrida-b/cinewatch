import React, { useEffect, useState } from 'react';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  const handleDeleteReview = (movieId) => {
    const updatedReviews = reviews.filter((review) => review.movieId !== movieId);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-red-900 mb-4">your reviews.</h1>
      {reviews.length === 0 ? (
        <p className="text-red-900">no reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.movieId} className="border border-2 border-green-900 bg-white rounded-lg p-2 my-2">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-green-900 flex-grow">{review.movieTitle}</h2>
              <button
                onClick={() => handleDeleteReview(review.movieId)}
                className="bg-red-900 font-bold rounded-lg text-white p-2 ml-2"
              >
                delete
              </button>
            </div>
            <p className="mt-2">{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewsPage;

