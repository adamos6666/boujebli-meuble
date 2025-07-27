"use client";
import { useEffect, useState, useRef } from 'react';

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Récupérer la langue depuis localStorage ou utiliser 'fr' par défaut
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);

    // Appliquer la classe RTL
    if (savedLocale === 'ar') {
      document.documentElement.classList.add('rtl');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.classList.remove('rtl');
      document.documentElement.setAttribute('dir', 'ltr');
    }

    // Fermer le dropdown si on clique en dehors
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLangChange = (lang: string) => {
    setLocale(lang);
    localStorage.setItem('locale', lang);
    setIsOpen(false);

    // Appliquer la classe RTL
    if (lang === 'ar') {
      document.documentElement.classList.add('rtl');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.classList.remove('rtl');
      document.documentElement.setAttribute('dir', 'ltr');
    }

    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale: lang } }));

    // Recharger la page pour appliquer les changements
    window.location.reload();
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton Globe */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        title="Changer de langue"
        data-testid="language-switcher"
      >
        <svg 
          className="w-5 h-5 text-gray-700" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLangChange(lang.code)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                locale === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg mr-3">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
              {locale === lang.code && (
                <svg className="ml-auto w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 