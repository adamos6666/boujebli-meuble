"use client";
import { useState } from 'react';
import { useHeaderTranslations } from '../../hooks/useHeaderTranslations';

const furnitureTranslations = {
  fr: {
    title: "Meubles",
    subtitle: "L'art du mobilier sur mesure",
    description: "Des meubles uniques qui s'adaptent à votre espace et à votre style de vie.",
    tvUnit: "Meuble TV",
    bathroomUnit: "Meuble Salle de Bain",
    coating: "Revêtement",
    viewCollection: "Voir la collection",
    requestQuote: "Demander un devis",
    tvUnitDesc: "Meubles TV modernes et fonctionnels",
    bathroomUnitDesc: "Meubles de salle de bain élégants",
    coatingDesc: "Revêtements muraux et de sol",
    customFurniture: "Meubles sur mesure",
    customFurnitureDesc: "Créations uniques selon vos besoins",
  },
  en: {
    title: "Furniture",
    subtitle: "The art of custom furniture",
    description: "Unique furniture that adapts to your space and lifestyle.",
    tvUnit: "TV Unit",
    bathroomUnit: "Bathroom Unit",
    coating: "Coating",
    viewCollection: "View collection",
    requestQuote: "Request quote",
    tvUnitDesc: "Modern and functional TV units",
    bathroomUnitDesc: "Elegant bathroom furniture",
    coatingDesc: "Wall and floor coverings",
    customFurniture: "Custom furniture",
    customFurnitureDesc: "Unique creations according to your needs",
  },
  ar: {
    title: "الأثاث",
    subtitle: "فن الأثاث المخصص",
    description: "أثاث فريد يتكيف مع مساحتك ونمط حياتك.",
    tvUnit: "وحدة تلفاز",
    bathroomUnit: "وحدة حمام",
    coating: "تغليف",
    viewCollection: "عرض المجموعة",
    requestQuote: "طلب عرض سعر",
    tvUnitDesc: "وحدات تلفاز حديثة ووظيفية",
    bathroomUnitDesc: "أثاث حمام أنيق",
    coatingDesc: "تغليف الجدران والأرضيات",
    customFurniture: "أثاث مخصص",
    customFurnitureDesc: "إبداعات فريدة حسب احتياجاتك",
  },
};

const furnitureCategories = [
  {
    id: 1,
    name: "Meuble TV",
    description: "Meubles TV modernes et fonctionnels",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Design moderne", "Rangement optimisé", "Câblage intégré", "Matériaux nobles"],
    options: ["Classique", "Moderne", "Minimaliste", "Rustique"]
  },
  {
    id: 2,
    name: "Meuble Salle de Bain",
    description: "Meubles de salle de bain élégants",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Résistance à l'humidité", "Rangement intelligent", "Design contemporain", "Facilité d'entretien"],
    options: ["Sous-vasque", "Colonne", "Meuble de toilette", "Étagères"]
  },
  {
    id: 3,
    name: "Revêtement",
    description: "Revêtements muraux et de sol",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Matériaux premium", "Installation professionnelle", "Finitions soignées", "Durabilité"],
    options: ["Bois massif", "Stratifié", "Mélaminé", "Laqué"]
  },
  {
    id: 4,
    name: "Meubles sur Mesure",
    description: "Créations uniques selon vos besoins",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    features: ["Design personnalisé", "Matériaux sur mesure", "Installation sur site", "Garantie qualité"],
    options: ["Bibliothèques", "Bureaux", "Étagères", "Créations spéciales"]
  }
];

export default function FurniturePage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = furnitureTranslations[locale as keyof typeof furnitureTranslations] || furnitureTranslations.fr;

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

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {furnitureCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h4>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Caractéristiques :</h5>
                  <ul className="space-y-2">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {category.options && (
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Options disponibles :</h5>
                    <div className="flex flex-wrap gap-2">
                      {category.options.map((option, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
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

      {/* Process Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre processus de création
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la conception à l'installation, nous vous accompagnons à chaque étape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">Étude de vos besoins et de votre espace.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conception</h3>
              <p className="text-gray-600">Création de plans et maquettes personnalisés.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fabrication</h3>
              <p className="text-gray-600">Réalisation artisanale dans nos ateliers.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Installation</h3>
              <p className="text-gray-600">Pose professionnelle et finitions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nos matériaux
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Qualité premium et durabilité pour tous nos meubles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bois massif</h3>
              <p className="text-gray-600">Chêne, frêne, noyer et autres essences nobles.</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Panneaux</h3>
              <p className="text-gray-600">MDF, contreplaqué et panneaux mélaminés.</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Finitions</h3>
              <p className="text-gray-600">Laque, placage et finitions sur mesure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à créer votre meuble de rêve ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos artisans créent des meubles uniques selon vos spécifications et votre style.
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