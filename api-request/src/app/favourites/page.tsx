'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navBar';
import MovieList from '../components/movieList';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteMovies');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Favorite Movies</h1>
        {favorites.length ? (
          <MovieList movies={favorites} />
        ) : (
          <p>You have no favorite movies yet.</p>
        )}
      </div>
    </>
  );
}
