"use client";
import { useState, useEffect } from 'react';
import { headerTranslations } from '../translations/header';

export function useHeaderTranslations() {
  const [locale, setLocale] = useState('fr');
  const [translations, setTranslations] = useState(headerTranslations.fr);

  useEffect(() => {
    // Récupérer la langue depuis localStorage
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
    setTranslations(headerTranslations[savedLocale as keyof typeof headerTranslations] || headerTranslations.fr);

    // Écouter les changements de localStorage
    const handleStorageChange = () => {
      const newLocale = localStorage.getItem('locale') || 'fr';
      setLocale(newLocale);
      setTranslations(headerTranslations[newLocale as keyof typeof headerTranslations] || headerTranslations.fr);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Écouter les changements personnalisés
    window.addEventListener('localeChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localeChanged', handleStorageChange);
    };
  }, []);

  return { locale, translations };
} 