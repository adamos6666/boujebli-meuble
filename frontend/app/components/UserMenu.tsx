"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const translations = {
  fr: {
    profile: "Mon Profil",
    requests: "Mes Demandes",
    favorites: "Favoris",
    messages: "Messages",
    settings: "Paramètres",
    logout: "Déconnexion",
    welcome: "Bonjour"
  },
  en: {
    profile: "My Profile",
    requests: "My Requests",
    favorites: "Favorites",
    messages: "Messages",
    settings: "Settings",
    logout: "Logout",
    welcome: "Hello"
  },
  ar: {
    profile: "ملفي الشخصي",
    requests: "طلباتي",
    favorites: "المفضلة",
    messages: "الرسائل",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    welcome: "مرحبا"
  }
};

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState('fr');
  const { user: hookUser, isAuthenticated: hookIsAuthenticated, logout: hookLogout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // État local pour l'authentification
  const [localUser, setLocalUser] = useState(null);
  const [localToken, setLocalToken] = useState(null);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false);

  const t = translations[locale as keyof typeof translations] || translations.fr;

  // Charger les données depuis localStorage
  useEffect(() => {
    console.log('🔄 UserMenu: Début du chargement des données...');
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      console.log('🔍 UserMenu: localStorage contient:', { 
        hasToken: !!token, 
        hasUser: !!userStr,
        tokenLength: token?.length || 0
      });
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          console.log('👤 UserMenu: Données utilisateur parsées:', userData);
          
          setLocalToken(token);
          setLocalUser(userData);
          setLocalIsAuthenticated(true);
          
          console.log('✅ UserMenu: Données chargées avec succès:', { 
            user: userData, 
            token: !!token,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('❌ UserMenu: Erreur parsing user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('❌ UserMenu: Aucune donnée d\'authentification trouvée');
      }
    }
  }, []);

  // Utiliser les données locales si le hook ne fonctionne pas
  const user = localUser || hookUser;
  const isAuthenticated = localIsAuthenticated || hookIsAuthenticated;
  
  const logout = () => {
    console.log('🚪 UserMenu: Déconnexion...');
    hookLogout();
    setLocalUser(null);
    setLocalToken(null);
    setLocalIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsOpen(false);
    router.push('/');
  };

  // Logs de débogage détaillés
  useEffect(() => {
    console.log('🔍 UserMenu Debug Complet:', {
      hookUser: hookUser,
      hookIsAuthenticated: hookIsAuthenticated,
      localUser: localUser,
      localIsAuthenticated: localIsAuthenticated,
      finalUser: user,
      finalIsAuthenticated: isAuthenticated,
      token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
      isOpen: isOpen,
      userRole: user?.role || 'aucun'
    });
  }, [hookUser, hookIsAuthenticated, localUser, localIsAuthenticated, user, isAuthenticated, isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') || 'fr';
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Si l'utilisateur n'est pas authentifié, afficher un bouton de connexion
  if (!isAuthenticated || !user) {
    console.log('❌ UserMenu: Utilisateur non authentifié - Affichage des boutons de connexion');
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/login"
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          Connexion
        </Link>
        <Link 
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Inscription
        </Link>
      </div>
    );
  }

  console.log('✅ UserMenu: Utilisateur authentifié - Affichage du menu pour:', user.name);

  return (
    <div 
      className="relative" 
      ref={menuRef}
    >
      {/* Bouton utilisateur */}
      <button
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        title={`${t.welcome}, ${user.name}`}
        onMouseEnter={() => {
          console.log('🖱️ Mouse Enter - Ouverture du menu');
          setIsOpen(true);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🖱️ Clic sur bouton utilisateur');
          setIsOpen(!isOpen);
        }}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          onMouseEnter={() => {
            console.log('🖱️ Mouse Enter sur menu - Garder ouvert');
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            console.log('🖱️ Mouse Leave sur menu - Fermer');
            setIsOpen(false);
          }}
        >
          {/* En-tête du menu */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{t.welcome}</p>
            <p className="text-sm text-gray-500 truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
            <p className="text-xs text-blue-500">Rôle: {user.role}</p>
          </div>

          {/* Options du menu */}
          <div className="py-2">
            {/* Mon Profil */}
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t.profile}
            </Link>

            {/* Mes Demandes */}
            <Link
              href="/my-requests"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.requests}
            </Link>

            {/* Favoris */}
            <Link
              href="/favorites"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {t.favorites}
            </Link>

            {/* Messages */}
            <Link
              href="/messages"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t.messages}
            </Link>

            {/* Paramètres */}
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.settings}
            </Link>

            {/* Séparateur */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Déconnexion */}
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {t.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 