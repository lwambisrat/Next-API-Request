'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-900 px-6 py-4 sticky top-0 z-50">
      <div className="text-yellow-400 font-semibold text-2xl">Moovie</div>
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-yellow-400 font-semibold hover:text-yellow-300">Home</Link>
        <Link href="/favourites" className="hover:text-yellow-300">My list</Link>
        <Link href="/favourites" className="hover:text-yellow-300">NEW</Link>
        <Link href="/signin">
          <button className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded">Sign In</button>
        </Link>
        
      </div>
    </nav>
  );
}
