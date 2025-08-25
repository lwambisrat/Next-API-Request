'use client';
import Link from 'next/link';
import { useState, createContext, useContext, ReactNode } from 'react';


interface SearchContextType {
  query: string;
  searchResults: any[];
  handleSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({
  query: '',
  searchResults: [],
  handleSearch: async () => {},
  clearSearch: () => {},
});

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    if (!newQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`/api/search?query=${encodeURIComponent(newQuery)}`);
    const data = await res.json();
    setSearchResults(data.results || []);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider value={{ query, searchResults, handleSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export default function Navbar() {
  const { query, handleSearch } = useSearch();
  const [input, setInput] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 px-6 py-4 sticky top-0 z-50">
      <div className="text-yellow-400 font-semibold text-2xl">Moovie</div>

      <form onSubmit={handleSubmit} className="flex ml-6 max-w-llg w-230">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a movie or series..."
          className="flex-grow rounded-l-full bg-gray-700 text-white px-6 py-2 focus:outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 rounded-r-full"
        >
          Search
        </button>
      </form>

      <div className="flex items-center space-x-6">
        <Link href="/" className="text-white hover:text-yellow-300">
          Home
        </Link>
        <Link href="/favourites" className="text-white hover:text-yellow-300">
          My list
        </Link>
        <Link href="/signin">
          <button className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}

export function NavbarWithSearchProvider() {
  return (
    <SearchProvider>
      <Navbar />
    </SearchProvider>
  );
}
