"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useHeaderTranslations } from '../hooks/useHeaderTranslations';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { translations } = useHeaderTranslations();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de recherche à implémenter
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder={translations.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-4 py-2 pl-10 pr-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
      </form>

      {/* Icône de personne - Lien vers login */}
      <Link
        href="/login"
        className="p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
        title={translations.myAccount}
      >
        <svg 
          className="h-6 w-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </Link>
    </div>
  );
} 