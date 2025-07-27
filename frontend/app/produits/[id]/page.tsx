"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProduit } from '../../hooks/useProduits';
import { useHeaderTranslations } from '../../hooks/useHeaderTranslations';

const productDetailTranslations = {
  fr: {
    backToProducts: "Retour aux produits",
    requestQuote: "Demander un devis",
    contactUs: "Nous contacter",
    specifications: "Spécifications",
    materials: "Matériaux",
    dimensions: "Dimensions",
    finish: "Finition",
    warranty: "Garantie",
    delivery: "Livraison",
    loading: "Chargement...",
    error: "Produit non trouvé",
  },
  en: {
    backToProducts: "Back to products",
    requestQuote: "Request quote",
    contactUs: "Contact us",
    specifications: "Specifications",
    materials: "Materials",
    dimensions: "Dimensions",
    finish: "Finish",
    warranty: "Warranty",
    delivery: "Delivery",
    loading: "Loading...",
    error: "Product not found",
  },
  ar: {
    backToProducts: "العودة إلى المنتجات",
    requestQuote: "طلب عرض سعر",
    contactUs: "اتصل بنا",
    specifications: "المواصفات",
    materials: "المواد",
    dimensions: "الأبعاد",
    finish: "التشطيب",
    warranty: "الضمان",
    delivery: "التوصيل",
    loading: "جاري التحميل...",
    error: "المنتج غير موجود",
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = productDetailTranslations[locale as keyof typeof productDetailTranslations] || productDetailTranslations.fr;

  const { produit, loading, error } = useProduit(productId);

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

  if (error || !produit) {
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
          <a
            href="/catalogue"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {translations.backToProducts}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/catalogue" className="text-gray-500 hover:text-gray-700">
                  Catalogue
                </a>
              </li>
              <li className="text-gray-900 font-medium">{produit.titre}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={produit.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"}
                alt={produit.titre}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop";
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{produit.titre}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{produit.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{translations.specifications}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{translations.materials}</h4>
                  <p className="text-gray-600">Bois massif, placage noble</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{translations.dimensions}</h4>
                  <p className="text-gray-600">Sur mesure</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{translations.finish}</h4>
                  <p className="text-gray-600">Finition soignée</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{translations.warranty}</h4>
                  <p className="text-gray-600">2 ans</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                {translations.requestQuote}
              </button>
              <a
                href="/contact"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center"
              >
                {translations.contactUs}
              </a>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">{translations.delivery}</h4>
              <p className="text-blue-800">
                Livraison et installation professionnelle dans toute la Tunisie. 
                Délai de fabrication : 4-6 semaines selon la complexité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 