'use client';

import MovieList from './movieList';

interface LatestSectionProps {
  movies: any[];
}

export default function LatestSection({ movies }: LatestSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Latest Movies & Series</h2>
      <MovieList movies={movies} />
    </section>
  );
}
