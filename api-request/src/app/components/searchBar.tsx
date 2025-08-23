'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex my-6 w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie or series..."
        className="flex-grow rounded-l-full bg-gray-700 text-white px-6 py-2 focus:outline-none placeholder-gray-400"
      />
      <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 rounded-r-full">
        Search
      </button>
    </form>
  );
}
