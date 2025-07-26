"use client";
import { useState } from 'react';
import { useHeaderTranslations } from '../../hooks/useHeaderTranslations';

const doorsTranslations = {
  fr: {
    title: "Portes",
    subtitle: "L'élégance à votre porte",
    description: "Des portes intérieures et extérieures qui allient esthétique, sécurité et durabilité.",
    interior: "Intérieur",
    exterior: "Extérieur",
    oak: "Chêne",
    ash: "Frêne",
    swing: "Battant",
    pivot: "À Pivot",
    viewCollection: "Voir la collection",
    requestQuote: "Demander un devis",
    interiorDesc: "Portes intérieures élégantes pour votre intérieur",
    exteriorDesc: "Portes extérieures sécurisées et durables",
    oakDesc: "Bois noble et résistant",
    ashDesc: "Bois clair et moderne",
    swingDesc: "Ouverture traditionnelle",
    pivotDesc: "Ouverture moderne et élégante",
  },
  en: {
    title: "Doors",
    subtitle: "Elegance at your door",
    description: "Interior and exterior doors that combine aesthetics, security and durability.",
    interior: "Interior",
    exterior: "Exterior",
    oak: "Oak",
    ash: "Ash",
    swing: "Swing",
    pivot: "Pivot",
    viewCollection: "View collection",
    requestQuote: "Request quote",
    interiorDesc: "Elegant interior doors for your home",
    exteriorDesc: "Secure and durable exterior doors",
    oakDesc: "Noble and resistant wood",
    ashDesc: "Light and modern wood",
    swingDesc: "Traditional opening",
    pivotDesc: "Modern and elegant opening",
  },
  ar: {
    title: "الأبواب",
    subtitle: "الأناقة عند بابك",
    description: "أبواب داخلية وخارجية تجمع بين الجمالية والأمان والمتانة.",
    interior: "داخلي",
    exterior: "خارجي",
    oak: "بلوط",
    ash: "رماد",
    swing: "معلق",
    pivot: "مفصلي",
    viewCollection: "عرض المجموعة",
    requestQuote: "طلب عرض سعر",
    interiorDesc: "أبواب داخلية أنيقة لمنزلك",
    exteriorDesc: "أبواب خارجية آمنة ومتينة",
    oakDesc: "خشب نبيل ومقاوم",
    ashDesc: "خشب فاتح وحديث",
    swingDesc: "فتح تقليدي",
    pivotDesc: "فتح حديث وأنيق",
  },
};

const doorCategories = [
  {
    id: 1,
    name: "Intérieur",
    description: "Portes intérieures élégantes pour votre intérieur",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    types: [
      { name: "Chêne", description: "Bois noble et résistant", features: ["Bois massif", "Finitions naturelles", "Résistance", "Esthétique classique"] },
      { name: "Frêne", description: "Bois clair et moderne", features: ["Bois clair", "Design contemporain", "Légèreté", "Facilité d'entretien"] }
    ]
  },
  {
    id: 2,
    name: "Extérieur",
    description: "Portes extérieures sécurisées et durables",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    types: [
      { name: "Battant", description: "Ouverture traditionnelle", features: ["Sécurité renforcée", "Isolation thermique", "Résistance aux intempéries", "Installation classique"] },
      { name: "À Pivot", description: "Ouverture moderne et élégante", features: ["Design moderne", "Ouverture fluide", "Économie d'espace", "Esthétique contemporaine"] }
    ]
  }
];

export default function DoorsPage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = doorsTranslations[locale as keyof typeof doorsTranslations] || doorsTranslations.fr;

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

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {doorCategories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{category.name}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {category.types.map((type, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={type.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-2xl font-bold text-white">{type.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{type.name}</h4>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                    
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Caractéristiques :</h5>
                      <ul className="space-y-2">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600">
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
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir nos portes ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Qualité artisanale, sécurité et design pour tous vos besoins.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité</h3>
              <p className="text-gray-600">Matériaux premium et finitions soignées.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sécurité</h3>
              <p className="text-gray-600">Systèmes de verrouillage renforcés.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Isolation</h3>
              <p className="text-gray-600">Excellente isolation thermique et acoustique.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design</h3>
              <p className="text-gray-600">Esthétique moderne et élégante.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'une porte sur mesure ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos artisans créent des portes uniques selon vos spécifications et votre style.
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