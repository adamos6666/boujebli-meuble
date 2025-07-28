"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const translations = {
  fr: {
    title: "Mes Favoris",
    subtitle: "Vos produits préférés",
    noFavorites: "Vous n'avez pas encore de favoris",
    addToFavorites: "Ajouter aux favoris",
    removeFromFavorites: "Retirer des favoris",
    viewProduct: "Voir le produit",
    price: "Prix",
    category: "Catégorie"
  },
  en: {
    title: "My Favorites",
    subtitle: "Your favorite products",
    noFavorites: "You don't have any favorites yet",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    viewProduct: "View product",
    price: "Price",
    category: "Category"
  },
  ar: {
    title: "المفضلة",
    subtitle: "منتجاتك المفضلة",
    noFavorites: "ليس لديك أي مفضلات بعد",
    addToFavorites: "إضافة إلى المفضلة",
    removeFromFavorites: "إزالة من المفضلة",
    viewProduct: "عرض المنتج",
    price: "السعر",
    category: "الفئة"
  }
};

// Données mockées pour les favoris
const mockFavorites = [
  {
    id: 1,
    name: "Cuisine moderne",
    price: "15,000 DT",
    category: "Cuisines",
    image: "/images/produits/cuisines/cuisine-moderne.jpg",
    description: "Cuisine moderne avec finition laquée"
  },
  {
    id: 2,
    name: "Dressing élégant",
    price: "8,500 DT",
    category: "Dressings",
    image: "/images/produits/dressing/dressing-elegant.jpg",
    description: "Dressing élégant avec miroirs"
  },
  {
    id: 3,
    name: "Portes d'entrée",
    price: "2,200 DT",
    category: "Portes",
    image: "/images/produits/portes/portes-entree.jpg",
    description: "Portes d'entrée en bois massif"
  }
];

export default function FavoritesPage() {
  const { user: hookUser, isAuthenticated: hookIsAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [favorites, setFavorites] = useState(mockFavorites);
  
  // État local pour l'authentification
  const [localUser, setLocalUser] = useState(null);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false);

  const t = translations[locale as keyof typeof translations] || translations.fr;

  // Charger les données depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setLocalUser(userData);
          setLocalIsAuthenticated(true);
          console.log('✅ FavoritesPage: Utilisateur chargé depuis localStorage:', userData);
        } catch (error) {
          console.error('❌ FavoritesPage: Erreur parsing user:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  // Utiliser les données locales si le hook ne fonctionne pas
  const user = localUser || hookUser;
  const isAuthenticated = localIsAuthenticated || hookIsAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('❌ FavoritesPage: Utilisateur non authentifié, redirection vers /login');
      router.push('/login');
    } else {
      console.log('✅ FavoritesPage: Utilisateur authentifié:', user);
    }
  }, [isAuthenticated, router, user]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(prev => prev.filter(favorite => favorite.id !== id));
  };

  // Afficher un loader pendant la vérification d'authentification
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noFavorites}</h3>
            <p className="text-gray-500 mb-4">Commencez par explorer nos produits et ajoutez vos favoris</p>
            <Link
              href="/produits"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Explorer les produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{favorite.name}</h3>
                    <button
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title={t.removeFromFavorites}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{favorite.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">{favorite.category}</span>
                    <span className="text-lg font-bold text-blue-600">{favorite.price}</span>
                  </div>
                  
                  <Link
                    href={`/produits/${favorite.id}`}
                    className="w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {t.viewProduct}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 