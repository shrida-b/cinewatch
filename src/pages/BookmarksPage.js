import React, { useEffect, useState } from 'react';

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const handleRemoveBookmark = (movieId) => {
    const updatedBookmarks = bookmarks.filter((movie) => movie.id !== movieId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-red-900 mb-4">your bookmarks.</h1>
      {bookmarks.length === 0 ? (
        <p className="text-red-900">no bookmarks yet.</p>
      ) : (
        bookmarks.map((movie) => (
          <div key={movie.movieId} className="border border-2 border-green-900 bg-white font-bold rounded-lg p-2 my-2 flex items-center">
            <h2 className="text-xl text-green-900 flex-grow">{movie.title}</h2>
            <button
              onClick={() => handleRemoveBookmark(movie.id)}
              className="bg-red-900 rounded-lg text-white p-2 ml-2"
            >
              delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BookmarksPage;
