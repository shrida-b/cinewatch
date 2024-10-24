import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api/movieApi';
import Notification from '../components/Notification';
import Modal from '../components/Modal';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' })


  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviewContent, setReviewContent] = useState('');

  //getting movie functionality
  const fetchMovies = async (searchQuery, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(searchQuery, page);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'no movies found.');
      }
    } catch (err) {
      console.error('search failed:', err);
      setError('failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const defaultQuery = 'movie';
    fetchMovies(defaultQuery);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      const defaultQuery = 'movie';
      fetchMovies(defaultQuery);
    } else {
      fetchMovies(query);
    }
  };
  //bookmark handling functionality
  const handleBookmark = (movie) => {
    const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    if (existingBookmarks.some((item) => item.id === movie.imdbID)) {
      setNotification({ message: 'movie is already bookmarked.', type: 'error' });
      return;
    }

    const newBookmark = {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    };

    const updatedBookmarks = [...existingBookmarks, newBookmark];
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setNotification({ message: 'movie bookmarked!', type: 'success' });
  };

  const openReviewModal = (movie) => {
    setSelectedMovie(movie);
    setTimeout(() => setShowReviewModal(true), 0);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedMovie(null);
    setReviewContent('');
  };

  // review handling functionality
  const handleReviewSubmit = () => {
    if (!reviewContent.trim() || !selectedMovie) {
      setNotification({ message: 'review cannot be empty.', type: 'error' });
      return;
    }

    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const newReview = {
      movieId: selectedMovie.imdbID,
      movieTitle: selectedMovie.Title,
      content: reviewContent,
    };

    const updatedReviews = [...existingReviews, newReview];
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    setNotification({ message: 'review added!', type: 'success' });
    closeReviewModal();
  };

  return (
    <div className="container mx-auto p-4">
      {/* notif */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />

      {/* search */}
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="search movies..."
          className="border p-2 rounded-sm flex-grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-red-900 text-white p-2 rounded-sm">search</button>
      </form>

      {/* loading */}
      {loading && <p className="text-red-900">loading...</p>}

      {/* error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* movies */}
      {!loading && !error && (
        <div className="mt-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="border border-2 border-green-900 bg-white rounded-lg p-2 my-2 flex items-center">
                {movie.Poster !== 'N/A' ? (
                  <img src={movie.Poster} alt={movie.Title} className="w-16 h-24 mr-4" />
                ) : (
                  <div className="w-16 h-24 mr-4 bg-gray-300 flex items-center justify-center">
                    <span>no image</span>
                  </div>
                )}
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-red-900">{movie.Title}</h2>
                  <p>{movie.Year}</p>
                </div>
                <div className="flex-shrink-0">
                  <button onClick={() => handleBookmark(movie)} className="bg-green-900 rounded-lg text-white p-2 ml-2">
                    bookmark
                  </button>
                  <button onClick={() => openReviewModal(movie)} className="bg-yellow-600 text-white rounded-lg p-2 ml-2">
                    review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-900">no movies found.</p>
          )}
        </div>
      )}

      {/* review form */}
      {showReviewModal && selectedMovie && (
        <Modal isOpen={showReviewModal} onClose={closeReviewModal}>
          <h2 className="text-xl font-bold mb-2">Review {selectedMovie.Title}</h2>
          <textarea
            className="w-full p-2 border border-red-900 rounded mb-2"
            placeholder="write your review here..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-green-900 text-white p-2 rounded"
          >
            submit review
          </button>
        </Modal>
      )}
    </div>
  );
}

export default SearchPage;