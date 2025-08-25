'use client';

import MovieCard from './movieCard';

interface MovieListProps {
  movies?: any[]; 
  onAddToFavorites?: (movie: any) => void;
}

export default function MovieList({ movies = [], onAddToFavorites }: MovieListProps) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onAddToFavorites={onAddToFavorites} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No movies found.</p>
      )}
    </div>
  );
}
