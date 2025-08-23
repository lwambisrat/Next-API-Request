'use client';

interface MovieCardProps {
  movie: any;
  onAddToFavorites?: (movie: any) => void;
}

export default function MovieCard({ movie, onAddToFavorites }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png';

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-2">
      <img src={posterUrl} alt={movie.title || movie.name} className="rounded" />
      <h3 className="mt-2 font-semibold truncate">{movie.title || movie.name}</h3>
      {onAddToFavorites && (
        <button
          onClick={() => onAddToFavorites(movie)}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded w-full"
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
}
