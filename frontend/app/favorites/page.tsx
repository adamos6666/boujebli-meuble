"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const translations = {
  fr: {
    title: "Mes Favoris",
    subtitle: "Vos produits préférés",
    noFavorites: "Vous n'avez pas encore de favoris",
    browseProducts: "Parcourir les produits",
    remove: "Retirer",
    view: "Voir le produit",
    category: "Catégorie",
    price: "Prix",
    actions: "Actions"
  },
  en: {
    title: "My Favorites",
    subtitle: "Your favorite products",
    noFavorites: "You don't have any favorites yet",
    browseProducts: "Browse products",
    remove: "Remove",
    view: "View product",
    category: "Category",
    price: "Price",
    actions: "Actions"
  },
  ar: {
    title: "المفضلة",
    subtitle: "منتجاتك المفضلة",
    noFavorites: "ليس لديك مفضلات بعد",
    browseProducts: "تصفح المنتجات",
    remove: "إزالة",
    view: "عرض المنتج",
    category: "الفئة",
    price: "السعر",
    actions: "الإجراءات"
  }
};

// Données mockées pour les favoris
const mockFavorites = [
  {
    id: 1,
    titre: "Cuisine Vintage",
    description: "Cuisine élégante style vintage",
    image: "/images/cuisine-vintage.jpg",
    category: "Cuisines",
    price: "15,000 DT",
    productId: 1
  },
  {
    id: 2,
    titre: "Portes en Chêne",
    description: "Portes d'intérieur en chêne massif",
    image: "/images/portes-chene.jpg",
    category: "Portes",
    price: "800 DT",
    productId: 5
  },
  {
    id: 3,
    titre: "Dressing Français",
    description: "Dressing style français avec placage",
    image: "/images/dressing-francais.jpg",
    category: "Dressing",
    price: "3,500 DT",
    productId: 8
  }
];

export default function FavoritesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [favorites, setFavorites] = useState(mockFavorites);

  const t = translations[locale as keyof typeof translations] || translations.fr;

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleRemove = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir retirer ce produit de vos favoris ?')) {
      setFavorites(favorites.filter(fav => fav.id !== id));
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <Link
              href="/catalogue"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.browseProducts}
            </Link>
          </div>
        </div>

        {/* Liste des favoris */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t.noFavorites}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par ajouter des produits à vos favoris.
              </p>
              <div className="mt-6">
                <Link
                  href="/catalogue"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t.browseProducts}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {favorite.titre}
                      </h3>
                      <button
                        onClick={() => handleRemove(favorite.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title={t.remove}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {favorite.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">{favorite.category}</span>
                      <span className="text-lg font-semibold text-blue-600">{favorite.price}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/produits/${favorite.productId}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        {t.view}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 