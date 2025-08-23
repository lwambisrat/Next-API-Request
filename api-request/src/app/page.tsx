'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/searchBar';
import CategoryTabs from './components/categoryTabs';
import LatestSection from './components/latestSection';
import MovieList from './components/movieList';

export default function HomePage() {
  const [latestMovies, setLatestMovies] = useState<any[]>([]);
  const [mostViewed, setMostViewed] = useState<any[]>([]);
  const [lastAdded, setLastAdded] = useState<any[]>([]);
  const [actionMovies, setActionMovies] = useState<any[]>([]);
  const [arabicMovies, setArabicMovies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [favMovies, setFavMovies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetch('/api/latest').then(res => res.json()).then(data => setLatestMovies(data.results || []));
    fetch('/api/most_viewed').then(res => res.json()).then(data => setMostViewed(data.results || []));
    fetch('/api/last_added').then(res => res.json()).then(data => setLastAdded(data.results || []));
    fetch('/api/action').then(res => res.json()).then(data => setActionMovies(data.results || []));
    fetch('/api/arabic').then(res => res.json()).then(data => setArabicMovies(data.results || []));

    const storedFavs = localStorage.getItem('favoriteMovies');
    if (storedFavs) setFavMovies(JSON.parse(storedFavs));
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setSearchResults(data.results || []);
  };

  const addToFavorites = (movie: any) => {
    if (favMovies.some(m => m.id === movie.id)) return;
    const updated = [...favMovies, movie];
    setFavMovies(updated);
    localStorage.setItem('favoriteMovies', JSON.stringify(updated));
  };

  const renderCategoryContent = () => {
    switch (activeTab) {
      case 'Most Viewed':
        return <MovieList movies={mostViewed} onAddToFavorites={addToFavorites} />;
      case 'Last Addition':
    
        return <MovieList movies={lastAdded} onAddToFavorites={addToFavorites} />;
      case 'Action':
        return <MovieList movies={actionMovies} onAddToFavorites={addToFavorites} />;
      case 'Arabic':
        return <MovieList movies={arabicMovies} onAddToFavorites={addToFavorites} />;
      default:
        return <MovieList movies={mostViewed} onAddToFavorites={addToFavorites} />;
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {searchResults.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <MovieList movies={searchResults} onAddToFavorites={addToFavorites} />
        </>
      ) : (
        <>
          <LatestSection movies={latestMovies} />

          <CategoryTabs
            tabs={['All', 'Action', 'Comedy','Arabic','series','Adventure','Other']}
            active={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'All' ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Most Viewed</h2>
              <MovieList movies={mostViewed} onAddToFavorites={addToFavorites} />
              <h2 className="text-2xl font-bold mb-4 mt-8">Last Addition</h2>
              <MovieList movies={lastAdded} onAddToFavorites={addToFavorites} />
              <h2 className="text-2xl font-bold mb-5 mt-8">Action</h2>
              <MovieList movies={actionMovies} onAddToFavorites={addToFavorites} />
              <h2 className="text-2xl font-bold mb-4 mt-8">Arabic</h2>
              <MovieList movies={arabicMovies} onAddToFavorites={addToFavorites} />
            </>
          ) : (
            renderCategoryContent()
          )}
        </>
      )}
    </>
  );
}
