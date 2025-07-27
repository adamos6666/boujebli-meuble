"use client";
import { useHeaderTranslations } from '../hooks/useHeaderTranslations';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

export default function TranslatedHeader() {
  const { translations } = useHeaderTranslations();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {translations.logo}
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
              {translations.home}
            </a>
            
            {/* Nos Produits Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium flex items-center">
                {translations.ourProducts}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Menu principal NOS PRODUITS */}
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {/* CUISINES avec sous-menu */}
                <div className="relative group/cuisines">
                  <a href="/produits/cuisines" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">{translations.kitchens}</a>
                  <div className="absolute top-0 left-full w-64 bg-white shadow-lg opacity-0 invisible group-hover/cuisines:opacity-100 group-hover/cuisines:visible transition-all duration-300">
                    <div className="px-4 py-2 text-sm text-gray-500 font-semibold border-b border-gray-100">{translations.kitchens}</div>
                    <a href="/produits/cuisine/vintage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.vintage}</a>
                    <a href="/produits/cuisine/velvety" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.velvety}</a>
                    <a href="/produits/cuisine/eternal-shine" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.eternalShine}</a>
                    <a href="/produits/cuisine/pure-luxury" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.pureLuxury}</a>
                  </div>
                </div>
                
                {/* PORTES avec sous-menu */}
                <div className="relative group/portes">
                  <a href="/produits/portes" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">{translations.doors}</a>
                  <div className="absolute top-0 left-full w-64 bg-white shadow-lg opacity-0 invisible group-hover/portes:opacity-100 group-hover/portes:visible transition-all duration-300">
                    <div className="px-4 py-2 text-sm text-gray-500 font-semibold border-b border-gray-100">{translations.doors}</div>
                    <div className="px-4 py-1 text-xs text-gray-400">{translations.interior}</div>
                    <a href="/produits/portes/interieur/chene" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.oak}</a>
                    <a href="/produits/portes/interieur/frene" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.ash}</a>
                    <div className="px-4 py-1 text-xs text-gray-400">{translations.exterior}</div>
                    <a href="/produits/portes/exterieur/battant" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.swing}</a>
                    <a href="/produits/portes/exterieur/pivot" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.pivot}</a>
                  </div>
                </div>
                
                {/* DRESSING avec sous-menu */}
                <div className="relative group/dressing">
                  <a href="/produits/dressing" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">{translations.dressing}</a>
                  <div className="absolute top-0 left-full w-64 bg-white shadow-lg opacity-0 invisible group-hover/dressing:opacity-100 group-hover/dressing:visible transition-all duration-300">
                    <div className="px-4 py-2 text-sm text-gray-500 font-semibold border-b border-gray-100">{translations.dressing}</div>
                    <div className="px-4 py-1 text-xs text-gray-400">{translations.frenchStyle}</div>
                    <a href="/produits/dressing/francaise/placage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.veneer}</a>
                    <a href="/produits/dressing/francaise/laque" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.lacquered}</a>
                    <a href="/produits/dressing/francaise/vitre" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 pl-8">{translations.glazed}</a>
                    <a href="/produits/dressing/coulissant" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.sliding}</a>
                    <a href="/produits/dressing/sans-facade" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.noFacade}</a>
                  </div>
                </div>
                
                {/* MEUBLES avec sous-menu */}
                <div className="relative group/meubles">
                  <a href="/produits/meubles" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">{translations.furniture}</a>
                  <div className="absolute top-0 left-full w-64 bg-white shadow-lg opacity-0 invisible group-hover/meubles:opacity-100 group-hover/meubles:visible transition-all duration-300">
                    <div className="px-4 py-2 text-sm text-gray-500 font-semibold border-b border-gray-100">{translations.furniture}</div>
                    <a href="/produits/meubles/tv" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.tvUnit}</a>
                    <a href="/produits/meubles/salle-de-bain" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.bathroomUnit}</a>
                    <a href="/produits/meubles/revetement" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.coating}</a>
                  </div>
                </div>
              </div>
            </div>

            <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
              {translations.contact}
            </a>
            
            <a href="/catalogue" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
              {translations.catalogue}
            </a>
          </nav>

          {/* Search Bar, User Menu, and Language Switcher */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            <UserMenu />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 