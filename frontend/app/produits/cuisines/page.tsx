"use client";
import { useState } from 'react';
import { useHeaderTranslations } from '../../hooks/useHeaderTranslations';
import { useProduits } from '../../hooks/useProduits';

const kitchensTranslations = {
  fr: {
    title: "Cuisines",
    subtitle: "Créez l'espace de vos rêves",
    description: "Des cuisines sur mesure qui allient élégance, fonctionnalité et durabilité.",
    vintage: "Vintage",
    velvety: "Velvety",
    eternalShine: "Eternal Shine",
    pureLuxury: "Pure Luxury",
    viewCollection: "Voir la collection",
    requestQuote: "Demander un devis",
    vintageDesc: "Charme intemporel et élégance classique",
    velvetyDesc: "Modernité et douceur au toucher",
    eternalShineDesc: "Brillance éternelle et sophistication",
    pureLuxuryDesc: "Luxe absolu et finitions exceptionnelles",
    loading: "Chargement...",
    error: "Erreur lors du chargement des cuisines",
    noKitchens: "Aucune cuisine trouvée",
  },
  en: {
    title: "Kitchens",
    subtitle: "Create the space of your dreams",
    description: "Custom kitchens that combine elegance, functionality and durability.",
    vintage: "Vintage",
    velvety: "Velvety",
    eternalShine: "Eternal Shine",
    pureLuxury: "Pure Luxury",
    viewCollection: "View collection",
    requestQuote: "Request quote",
    vintageDesc: "Timeless charm and classic elegance",
    velvetyDesc: "Modernity and soft touch",
    eternalShineDesc: "Eternal shine and sophistication",
    pureLuxuryDesc: "Absolute luxury and exceptional finishes",
    loading: "Loading...",
    error: "Error loading kitchens",
    noKitchens: "No kitchens found",
  },
  ar: {
    title: "المطابخ",
    subtitle: "أنشئ مساحة أحلامك",
    description: "مطابخ مخصصة تجمع بين الأناقة والوظائف والمتانة.",
    vintage: "فينتاج",
    velvety: "فيلفيتي",
    eternalShine: "بريق أبدي",
    pureLuxury: "فخامة نقية",
    viewCollection: "عرض المجموعة",
    requestQuote: "طلب عرض سعر",
    vintageDesc: "سحر خالد وأناقة كلاسيكية",
    velvetyDesc: "حداثة ولمس ناعم",
    eternalShineDesc: "بريق أبدي وتطور",
    pureLuxuryDesc: "فخامة مطلقة وتشطيبات استثنائية",
    loading: "جاري التحميل...",
    error: "خطأ في تحميل المطابخ",
    noKitchens: "لم يتم العثور على مطابخ",
  },
};

// Collections de cuisines prédéfinies
const kitchenCollections = [
  {
    id: 1,
    name: "Vintage",
    description: "Charme intemporel et élégance classique",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Bois massif", "Finitions traditionnelles", "Détails artisanaux", "Couleurs chaudes"]
  },
  {
    id: 2,
    name: "Velvety",
    description: "Modernité et douceur au toucher",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Revêtement velours", "Design épuré", "Fonctionnalité optimale", "Couleurs neutres"]
  },
  {
    id: 3,
    name: "Eternal Shine",
    description: "Brillance éternelle et sophistication",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Finitions brillantes", "Éclairage intégré", "Matériaux premium", "Design contemporain"]
  },
  {
    id: 4,
    name: "Pure Luxury",
    description: "Luxe absolu et finitions exceptionnelles",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Matériaux nobles", "Finitions sur mesure", "Équipements haut de gamme", "Design exclusif"]
  }
];

export default function KitchensPage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = kitchensTranslations[locale as keyof typeof kitchensTranslations] || kitchensTranslations.fr;

  // Récupérer les produits de cuisine depuis le backend
  const { produits, loading, error } = useProduits(locale);
  
  // Filtrer seulement les cuisines
  const cuisines = produits.filter(product => 
    product.titre.toLowerCase().includes('cuisine') || 
    product.titre.toLowerCase().includes('kitchen')
  );

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

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {kitchenCollections.map((collection) => (
            <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">{collection.name}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{collection.name}</h4>
                <p className="text-gray-600 mb-6">{collection.description}</p>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Caractéristiques :</h5>
                  <ul className="space-y-2">
                    {collection.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                    {translations.viewCollection}
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    {translations.requestQuote}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Produits de cuisine du backend */}
      {cuisines.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nos cuisines disponibles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez nos créations de cuisines sur mesure
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cuisines.map((cuisine) => (
                <div key={cuisine.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={cuisine.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"}
                      alt={cuisine.titre}
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cuisine.titre}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{cuisine.description}</p>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                        {translations.viewCollection}
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                        {translations.requestQuote}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir nos cuisines ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Qualité artisanale, matériaux premium et design sur mesure pour votre espace unique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sur mesure</h3>
              <p className="text-gray-600">Chaque cuisine est conçue selon vos besoins et votre espace.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité premium</h3>
              <p className="text-gray-600">Matériaux de première qualité pour une durabilité exceptionnelle.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison rapide</h3>
              <p className="text-gray-600">Installation professionnelle dans les délais convenus.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à créer votre cuisine de rêve ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un rendez-vous et découvrez nos collections en showroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Prendre rendez-vous
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Voir le catalogue complet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 