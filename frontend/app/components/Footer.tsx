"use client";
import { useEffect, useState } from 'react';

const translations = {
  fr: {
    tagline: "CUISINE DRESSING PORTE MEUBLE",
    slogan: "Vous pouvez trouver l'inspiration, des idées et de l'innovation",
    showroom_tunis: "Showroom Tunis",
    showroom_sfax: "Showroom Sfax", 
    showroom_sousse: "Showroom Sousse",
    copyright: "Copyright 2025 © Boujebli Meuble. Tous droits réservés."
  },
  en: {
    tagline: "KITCHEN DRESSING DOOR FURNITURE",
    slogan: "You can find inspiration, ideas and innovation",
    showroom_tunis: "Tunis Showroom",
    showroom_sfax: "Sfax Showroom",
    showroom_sousse: "Sousse Showroom", 
    copyright: "Copyright 2025 © Boujebli Meuble. All rights reserved."
  },
  ar: {
    tagline: "مطبخ خزانة باب أثاث",
    slogan: "يمكنك العثور على الإلهام والأفكار والابتكار",
    showroom_tunis: "معرض تونس",
    showroom_sfax: "معرض صفاقس",
    showroom_sousse: "معرض سوسة",
    copyright: "حقوق النشر 2025 © بوجيبلي للأثاث. جميع الحقوق محفوظة."
  }
};

const showrooms = [
  {
    name: 'showroom_tunis',
    phone: '+216 70 70 694 354 / +216 26 240 555',
    email: 'boujebli.tunis@gmail.com',
    address: '113 Avenue U.M.A Soukra 2036 Ariana, Tunisie'
  },
  {
    name: 'showroom_sfax',
    phone: '+216 74 440 202 / +216 26 301 555',
    email: 'boujebli.sfax@gmail.com',
    address: 'Route de Tunis Km1.5, immeuble Ariana Palace, Magasin 2, 3003 Sfax- Tunisie'
  },
  {
    name: 'showroom_sousse',
    phone: '+216 70 038 359 / +216 21 815 555',
    email: 'boujebli.sousse@gmail.com',
    address: 'Av. 14 Janvier N°3 Hammam Sousse, El Kantaoui, Sousse-Tunisie'
  }
];

export default function Footer() {
  const [locale, setLocale] = useState('fr');
  const t = translations[locale as keyof typeof translations] || translations.fr;

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white">
      {/* Top Branding Area */}
      <div className="text-center py-12">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-6 bg-white mr-2 relative">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
          </div>
          <h2 className="text-3xl font-bold">BOUJEBLI</h2>
        </div>
        <p className="text-sm text-gray-300 mb-4">{t.tagline}</p>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {t.slogan}
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {showrooms.map((showroom, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-bold mb-6">{t[showroom.name as keyof typeof t]}</h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 mr-2">📞</span>
                  <span className="text-sm">{showroom.phone}</span>
                </div>
                
                {/* Email */}
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 mr-2">✉️</span>
                  <span className="text-sm">{showroom.email}</span>
                </div>
                
                {/* Address */}
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 mr-2">🏠</span>
                  <span className="text-sm">{showroom.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Social Media and Copyright */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              {t.copyright} <span className="text-white hover:text-gray-300 cursor-pointer">Propulsé par Hypermedia</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 z-50"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
} 