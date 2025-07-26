import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export default function Home() {
  // next-i18next n'est pas compatible avec app/ par défaut, donc on va utiliser un fallback simple pour la démo
  // Pour une vraie app, il faut déplacer les pages dans /pages ou utiliser un provider custom
  // Ici, on lit la langue depuis l'URL (locale) et on change dynamiquement le HTML dir
  const router = useRouter();
  const locale = typeof window !== 'undefined' ? (window.location.pathname.split('/')[1] || 'fr') : 'fr';
  const t = (key: string) => {
    if (locale === 'ar') {
      if (key === 'welcome') return 'مرحبًا بكم في بوجيبلي للأثاث!';
      if (key === 'home') return 'الرئيسية';
    }
    if (locale === 'en') {
      if (key === 'welcome') return 'Welcome to Boujebli Meuble!';
      if (key === 'home') return 'Home';
    }
    // FR par défaut
    if (key === 'welcome') return 'Bienvenue chez Boujebli Meuble !';
    if (key === 'home') return 'Accueil';
    return key;
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (locale === 'ar') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  }, [locale]);

  const handleLangChange = (lang: string) => {
    const path = window.location.pathname.split('/').slice(2).join('/');
    window.location.href = `/${lang}/${path}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mb-8 text-3xl font-bold">
        {t('welcome')}
      </div>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`px-4 py-2 rounded border ${locale === lang.code ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => handleLangChange(lang.code)}
          >
            {lang.label}
          </button>
        ))}
        </div>
      </main>
  );
}
