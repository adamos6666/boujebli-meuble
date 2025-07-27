"use client";
import { useState, useEffect, useCallback } from 'react';
import { apiService, ProduitStandard } from '../services/api';

interface SearchFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  language?: string;
  hasImage?: boolean;
}

interface AdvancedSearchProps {
  onResultsChange: (results: ProduitStandard[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

export default function AdvancedSearch({ onResultsChange, onLoadingChange }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<ProduitStandard[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Search function
  const performSearch = useCallback(async () => {
    if (!debouncedQuery.trim() && Object.keys(filters).length === 0) {
      setResults([]);
      onResultsChange([]);
      return;
    }

    setLoading(true);
    onLoadingChange(true);

    try {
      let allProducts = await apiService.getProduitsStandards();
      
      // Apply text search
      if (debouncedQuery.trim()) {
        const searchTerm = debouncedQuery.toLowerCase();
        allProducts = allProducts.filter(product =>
          product.titre.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      }

      // Apply filters
      if (filters.category) {
        allProducts = allProducts.filter(product =>
          product.titre.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }

      if (filters.language) {
        allProducts = allProducts.filter(product =>
          product.langues.includes(filters.language!)
        );
      }

      if (filters.hasImage) {
        allProducts = allProducts.filter(product => product.image);
      }

      setResults(allProducts);
      onResultsChange(allProducts);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
      onResultsChange([]);
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  }, [debouncedQuery, filters, onResultsChange, onLoadingChange]);

  // Perform search when query or filters change
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setQuery('');
  };

  const categories = [
    { value: 'cuisine', label: 'Cuisines' },
    { value: 'dressing', label: 'Dressing' },
    { value: 'portes', label: 'Portes' },
    { value: 'meubles', label: 'Meubles' },
  ];

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recherche Avancée</h3>
        
        {/* Search Input */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Rechercher
          </label>
          <input
            type="text"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans les titres et descriptions..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              id="category"
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Langue
            </label>
            <select
              id="language"
              value={filters.language || ''}
              onChange={(e) => handleFilterChange('language', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les langues</option>
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avec image
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasImage"
                checked={filters.hasImage || false}
                onChange={(e) => handleFilterChange('hasImage', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasImage" className="ml-2 text-sm text-gray-700">
                Afficher seulement les produits avec image
              </label>
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-between items-center">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Effacer les filtres
          </button>
          
          {loading && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Recherche en cours...
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {results.length > 0 && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
} 