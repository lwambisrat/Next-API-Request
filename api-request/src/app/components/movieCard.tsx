'use client';

import { useState, useEffect } from 'react';

interface MovieCardProps {
  movie: any;
  onAddToFavorites?: (movie: any) => void;
}

export default function MovieCard({ movie, onAddToFavorites }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png';

  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
  }, [movie]);

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
    if (onAddToFavorites) {
      onAddToFavorites(movie);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-2">
      <img src={posterUrl} alt={movie.title || movie.name} className="rounded" />
      <h3 className="mt-2 font-semibold truncate">{movie.title || movie.name}</h3>
      {onAddToFavorites && (
        <button
          onClick={toggleFavorite}
          className="mt-2 px-3 py-1 rounded w-full flex justify-center items-center"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={favorited ? 'yellow' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            className="w-7 h-7 ml-32"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364 4.318 12.682a4.5 4.5 0 0 1 0-6.364z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
