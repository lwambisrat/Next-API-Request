'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

export default function LatestMovieHighlight() {
  const router = useRouter();
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/latest')
      .then(res => res.json())
      .then(data => setLatestMovies((data.results || []).slice(0, 4)));
  }, []);

  useEffect(() => {
    if (latestMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % latestMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [latestMovies]);

  const featuredMovie = latestMovies[currentIndex];

  if (!featuredMovie) return <div>Loading...</div>;

  const handleWatchNow = () => {
    router.push(`/movies/${featuredMovie.id}`);
  };

  return (
    <>
      <section
        className="relative h-[600px] w-full bg-cover bg-center flex items-center text-white transition-all duration-300 ease-in-out"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})` }}
        aria-label={`Featured movie: ${featuredMovie.title}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

        <div className="relative px-10 max-w-5xl">
          <h1 className="text-5xl font-extrabold mb-4 max-w-3xl">
            {featuredMovie.title.split(':')[0]}{': '}
            <span className="text-yellow-400">{featuredMovie.title.split(':')[1] || ''}</span>
          </h1>
          <p className="max-w-4xl text-sm text-gray-300 mb-6 leading-relaxed">{featuredMovie.overview}</p>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleWatchNow}
              className="bg-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
            >
              Watch Now
            </button>
            <button className="border border-yellow-500 px-6 py-3 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
              Add to Favorites
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-center space-x-3 mt-4">
        {latestMovies.map((_, index) => (
          <button
            key={index}
            aria-label={`Slide ${index + 1}`}
            className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-yellow-500' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </>
  );
}
