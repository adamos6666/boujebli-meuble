"use client";
import { useState, useEffect } from 'react';
import { useHeaderTranslations } from '../hooks/useHeaderTranslations';
import { useProduits } from '../hooks/useProduits';

const produitsTranslations = {
  fr: {
    title: "Nos Produits",
    subtitle: "Découvrez notre gamme complète",
    description: "Des meubles sur mesure et standards pour tous vos besoins.",
    filterAll: "Tous",
    filterKitchens: "Cuisines",
    filterDoors: "Portes",
    filterDressing: "Dressing",
    filterFurniture: "Meubles",
    viewDetails: "Voir détails",
    requestQuote: "Demander un devis",
    noProducts: "Aucun produit trouvé",
    loading: "Chargement...",
    error: "Erreur lors du chargement des produits",
  },
  en: {
    title: "Our Products",
    subtitle: "Discover our complete range",
    description: "Custom and standard furniture for all your needs.",
    filterAll: "All",
    filterKitchens: "Kitchens",
    filterDoors: "Doors",
    filterDressing: "Dressing",
    filterFurniture: "Furniture",
    viewDetails: "View details",
    requestQuote: "Request quote",
    noProducts: "No products found",
    loading: "Loading...",
    error: "Error loading products",
  },
  ar: {
    title: "منتجاتنا",
    subtitle: "اكتشف مجموعتنا الكاملة",
    description: "أثاث مخصص وقياسي لجميع احتياجاتك.",
    filterAll: "الكل",
    filterKitchens: "المطابخ",
    filterDoors: "الأبواب",
    filterDressing: "الخزائن",
    filterFurniture: "الأثاث",
    viewDetails: "عرض التفاصيل",
    requestQuote: "طلب عرض سعر",
    noProducts: "لم يتم العثور على منتجات",
    loading: "جاري التحميل...",
    error: "خطأ في تحميل المنتجات",
  },
};

// Fonction pour déterminer la catégorie d'un produit basée sur son titre
const getProductCategory = (titre: string): string => {
  const titreLower = titre.toLowerCase();
  
  if (titreLower.includes('cuisine') || titreLower.includes('kitchen')) {
    return 'kitchens';
  }
  if (titreLower.includes('porte') || titreLower.includes('door')) {
    return 'doors';
  }
  if (titreLower.includes('dressing') || titreLower.includes('wardrobe')) {
    return 'dressing';
  }
  if (titreLower.includes('meuble') || titreLower.includes('furniture') || titreLower.includes('tv') || titreLower.includes('bathroom')) {
    return 'furniture';
  }
  
  return 'other';
};

export default function ProduitsPage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = produitsTranslations[locale as keyof typeof produitsTranslations] || produitsTranslations.fr;

  // Récupérer les produits depuis le backend
  const { produits, loading, error } = useProduits(locale);

  const [activeFilter, setActiveFilter] = useState('all');

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = activeFilter === 'all' 
    ? produits 
    : produits.filter(product => getProductCategory(product.titre) === activeFilter);

  const handleFilter = (category: string) => {
    setActiveFilter(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{translations.error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{translations.title}</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {translations.subtitle}
          </p>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            {translations.description}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translations.filterAll}
            </button>
            <button
              onClick={() => handleFilter('kitchens')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'kitchens'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translations.filterKitchens}
            </button>
            <button
              onClick={() => handleFilter('doors')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'doors'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translations.filterDoors}
            </button>
            <button
              onClick={() => handleFilter('dressing')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'dressing'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translations.filterDressing}
            </button>
            <button
              onClick={() => handleFilter('furniture')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'furniture'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translations.filterFurniture}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">{translations.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"}
                    alt={product.titre}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Sur devis
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.titre}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                      {translations.viewDetails}
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                      {translations.requestQuote}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'un produit sur mesure ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos artisans créent des meubles uniques selon vos spécifications et votre style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Demander un devis
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 