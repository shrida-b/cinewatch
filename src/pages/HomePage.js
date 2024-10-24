// src/pages/HomePage.js
import React from 'react';
function HomePage() {
  return (
    <div className="container mx-auto p-10 text-center py-10 mt-40">
      <h1 className="text-6xl font-bold mb-5 text-red-900">
        cinewatch.
        </h1>
      <p className="text-xl text-green-900 font-bold">
        find, bookmark, and review your favorite movies in an instant. 🎬
        </p>
        <p className="text-xl text-red-900 mt-5 mb-8">
        start by exploring our collection of movies. use the search feature to find your favorites.
        </p>
        <a href="/search" className="border border-2 border-green-900 bg-white text-green-900 px-3 py-3 rounded-full text-xl font-bold">
            start searching
        </a>
    </div>
  );
}

export default HomePage;
