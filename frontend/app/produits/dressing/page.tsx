"use client";
import { useState } from 'react';
import { useHeaderTranslations } from '../../hooks/useHeaderTranslations';
import { useProduits } from '../../hooks/useProduits';

const dressingTranslations = {
  fr: {
    title: "Dressing",
    subtitle: "Organisez votre espace avec élégance",
    description: "Des dressings sur mesure qui allient fonctionnalité, organisation et style.",
    frenchStyle: "À la Française",
    sliding: "Coulissant",
    noFacade: "Sans Façade",
    veneer: "Placage",
    lacquered: "Laqué",
    glazed: "Vitré",
    viewCollection: "Voir la collection",
    requestQuote: "Demander un devis",
    frenchStyleDesc: "Élégance et sophistication à la française",
    slidingDesc: "Gain de place et modernité",
    noFacadeDesc: "Minimalisme et fonctionnalité",
    veneerDesc: "Bois noble et naturel",
    lacqueredDesc: "Finitions brillantes et modernes",
    glazedDesc: "Transparence et légèreté",
  },
  en: {
    title: "Dressing",
    subtitle: "Organize your space with elegance",
    description: "Custom dressing rooms that combine functionality, organization and style.",
    frenchStyle: "French Style",
    sliding: "Sliding",
    noFacade: "No Facade",
    veneer: "Veneer",
    lacquered: "Lacquered",
    glazed: "Glazed",
    viewCollection: "View collection",
    requestQuote: "Request quote",
    frenchStyleDesc: "French elegance and sophistication",
    slidingDesc: "Space saving and modernity",
    noFacadeDesc: "Minimalism and functionality",
    veneerDesc: "Noble and natural wood",
    lacqueredDesc: "Bright and modern finishes",
    glazedDesc: "Transparency and lightness",
  },
  ar: {
    title: "الخزائن",
    subtitle: "نظم مساحتك بأناقة",
    description: "خزائن مخصصة تجمع بين الوظائف والتنظيم والأناقة.",
    frenchStyle: "بالأسلوب الفرنسي",
    sliding: "منزلق",
    noFacade: "بدون واجهة",
    veneer: "قشرة",
    lacquered: "مطلي",
    glazed: "مزجج",
    viewCollection: "عرض المجموعة",
    requestQuote: "طلب عرض سعر",
    frenchStyleDesc: "أناقة وتطور بالطريقة الفرنسية",
    slidingDesc: "توفير المساحة والحداثة",
    noFacadeDesc: "الحد الأدنى والوظائف",
    veneerDesc: "خشب نبيل وطبيعي",
    lacqueredDesc: "تشطيبات لامعة وحديثة",
    glazedDesc: "الشفافية والخفة",
  },
};

const dressingCategories = [
  {
    id: 1,
    name: "À la Française",
    description: "Élégance et sophistication à la française",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    types: [
      { 
        name: "Placage", 
        description: "Bois noble et naturel", 
        features: ["Bois massif", "Finitions naturelles", "Résistance", "Esthétique classique"] 
      },
      { 
        name: "Laqué", 
        description: "Finitions brillantes et modernes", 
        features: ["Surface lisse", "Couleurs vives", "Facilité d'entretien", "Design contemporain"] 
      },
      { 
        name: "Vitré", 
        description: "Transparence et légèreté", 
        features: ["Portes vitrées", "Visibilité", "Éclairage intégré", "Modernité"] 
      }
    ]
  },
  {
    id: 2,
    name: "Coulissant",
    description: "Gain de place et modernité",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Portes coulissantes", "Gain d'espace", "Système silencieux", "Installation facile"]
  },
  {
    id: 3,
    name: "Sans Façade",
    description: "Minimalisme et fonctionnalité",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Design épuré", "Accessibilité maximale", "Organisation optimale", "Style contemporain"]
  }
];

export default function DressingPage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = dressingTranslations[locale as keyof typeof dressingTranslations] || dressingTranslations.fr;
  
  // Récupérer les produits de dressing depuis le backend
  const { produits, loading, error } = useProduits(locale);
  
  // Filtrer seulement les dressings - s'assurer que produits est un tableau
  const dressings = Array.isArray(produits) ? produits.filter(product => 
    product.titre.toLowerCase().includes('dressing') || 
    product.titre.toLowerCase().includes('wardrobe')
  ) : [];

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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {dressings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dressings.map((dressing) => (
              <div key={dressing.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={dressing.image || '/images/placeholder.jpg'}
                    alt={dressing.titre}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold text-white">{dressing.titre}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{dressing.titre}</h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">{dressing.description}</p>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                      {translations.viewCollection}
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                      {translations.requestQuote}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-8 mx-auto mb-6 w-24 h-24 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun dressing trouvé</h3>
            <p className="text-gray-600 mb-6">Aucun dressing n'est disponible pour le moment.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Actualiser
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir nos dressings ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organisation optimale, design sur mesure et qualité artisanale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Organisation</h3>
              <p className="text-gray-600">Optimisation de l'espace et rangement intelligent.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design</h3>
              <p className="text-gray-600">Esthétique moderne et élégante sur mesure.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité</h3>
              <p className="text-gray-600">Matériaux durables et finitions soignées.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'un dressing sur mesure ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos experts créent des dressings uniques selon vos besoins et votre espace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Demander un devis
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Voir nos réalisations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 