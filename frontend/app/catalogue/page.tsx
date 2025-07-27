"use client";
import { useState, useEffect } from 'react';
import { useHeaderTranslations } from '../hooks/useHeaderTranslations';
import { useProduits } from '../hooks/useProduits';

const catalogueTranslations = {
  fr: {
    title: "Catalogue",
    subtitle: "Découvrez notre collection complète",
    description: "Explorez notre gamme complète de meubles sur mesure et standards.",
    filterAll: "Tous",
    filterKitchens: "Cuisines",
    filterDoors: "Portes",
    filterDressing: "Dressing",
    filterFurniture: "Meubles",
    viewDetails: "Voir détails",
    requestQuote: "Demander un devis",
    noProducts: "Aucun produit trouvé",
    loading: "Chargement...",
  },
  en: {
    title: "Catalog",
    subtitle: "Discover our complete collection",
    description: "Explore our complete range of custom and standard furniture.",
    filterAll: "All",
    filterKitchens: "Kitchens",
    filterDoors: "Doors",
    filterDressing: "Dressing",
    filterFurniture: "Furniture",
    viewDetails: "View details",
    requestQuote: "Request quote",
    noProducts: "No products found",
    loading: "Loading...",
  },
  ar: {
    title: "الكاتالوج",
    subtitle: "اكتشف مجموعتنا الكاملة",
    description: "استكشف مجموعتنا الكاملة من الأثاث المخصص والقياسي.",
    filterAll: "الكل",
    filterKitchens: "المطابخ",
    filterDoors: "الأبواب",
    filterDressing: "الخزائن",
    filterFurniture: "الأثاث",
    viewDetails: "عرض التفاصيل",
    requestQuote: "طلب عرض سعر",
    noProducts: "لم يتم العثور على منتجات",
    loading: "جاري التحميل...",
  },
};

export default function CataloguePage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = catalogueTranslations[locale as keyof typeof catalogueTranslations] || catalogueTranslations.fr;

  // Récupérer les produits depuis le backend
  const { produits, loading, error } = useProduits(locale);
  
  // S'assurer que produits est un tableau
  const produitsArray = Array.isArray(produits) ? produits : [];

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(produitsArray);

  // Mettre à jour les produits filtrés quand les produits changent
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(produitsArray);
    } else {
      setFilteredProducts(produitsArray.filter(product => {
        const titre = product.titre.toLowerCase();
        switch (activeFilter) {
          case 'kitchens':
            return titre.includes('cuisine') || titre.includes('kitchen');
          case 'doors':
            return titre.includes('porte') || titre.includes('door');
          case 'dressing':
            return titre.includes('dressing') || titre.includes('wardrobe');
          case 'furniture':
            return titre.includes('meuble') || titre.includes('furniture');
          default:
            return true;
        }
      }));
    }
  }, [produitsArray, activeFilter]);

  const handleFilter = (category: string) => {
    setActiveFilter(category);
  };

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
            <p className="text-gray-500 text-lg">{translations.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex space-x-3">
                                                    <a
                                  href={`/produits/${product.id}`}
                                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                                >
                                  {translations.viewDetails}
                                </a>
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