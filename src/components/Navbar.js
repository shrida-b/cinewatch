import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-900 text-white p-4 font-bold">
      <Link to="/" className="mr-4">home</Link>
      <Link to="/search" className="mr-4">search</Link>
      <Link to="/bookmarks" className="mr-4">bookmarks</Link>
      <Link to="/reviews">reviews</Link>
    </nav>
  );
}

export default Navbar;
