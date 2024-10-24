import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';
import ReviewsPage from './pages/ReviewsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App" class="bg-white">
      <Router>
        <Navbar />
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </Router>
      <body class="h-screen bg-white" ></body>
    </div>
  );
}

export default App;
