"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [locale, setLocale] = useState('fr');
  
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  const t = (key: string) => {
    if (locale === 'ar') {
      if (key === 'hero_title') return 'صمم مشروعك مع خبراء';
      if (key === 'hero_subtitle') return 'مطبخ و خزانة و أبواب و أثاث';
      if (key === 'cta') return 'اكتشف مجموعتنا';
      if (key === 'about_title') return 'حولنا';
      if (key === 'about_subtitle') return 'حلول إبداعية من مصممين محترفين';
      if (key === 'about_text') return 'بوجيبلي، شريكك في تأثيث المنزل! اكتشف تشكيلة واسعة من المطابخ والخزائن والأبواب وأثاث التلفاز والحمامات. خبراؤنا هنا لتقديم المشورة وضمان أفضل تصميم.';
      if (key === 'products_title') return 'منتجاتنا';
      if (key === 'kitchen') return 'مطبخ';
      if (key === 'dressing') return 'خزانة';
      if (key === 'doors') return 'أبواب';
      if (key === 'furniture') return 'أثاث';
      if (key === 'view_more') return 'عرض المزيد';
    }
    if (locale === 'en') {
      if (key === 'hero_title') return 'Design your project with experts';
      if (key === 'hero_subtitle') return 'Kitchen & Dressing & Doors & Furniture';
      if (key === 'cta') return 'Discover our collection';
      if (key === 'about_title') return 'About us';
      if (key === 'about_subtitle') return 'Creative solutions by professional designers';
      if (key === 'about_text') return 'Boujebli, your partner for home furnishing! Discover a wide range of kitchens, dressings, doors, TV furniture and bathroom furniture. Our experts are here to advise you and guarantee the best design.';
      if (key === 'products_title') return 'Our products';
      if (key === 'kitchen') return 'Kitchen';
      if (key === 'dressing') return 'Dressing';
      if (key === 'doors') return 'Doors';
      if (key === 'furniture') return 'Furniture';
      if (key === 'view_more') return 'View more';
    }
    // FR par défaut
    if (key === 'hero_title') return 'Concevez votre projet avec des experts';
    if (key === 'hero_subtitle') return 'Cuisine & Dressing & Portes & Meubles';
    if (key === 'cta') return 'Découvrir notre collection';
    if (key === 'about_title') return 'À propos de nous';
    if (key === 'about_subtitle') return 'Solutions créatives par des designers professionnels';
    if (key === 'about_text') return 'Boujebli, votre partenaire pour l\'aménagement de maison ! Découvrez un large choix de cuisines, dressings, portes, meubles TV et de salle de bain. Nos experts sont là pour vous conseiller et garantir le meilleur design.';
    if (key === 'products_title') return 'Nos produits';
    if (key === 'kitchen') return 'Cuisine';
    if (key === 'dressing') return 'Dressing';
    if (key === 'doors') return 'Portes';
    if (key === 'furniture') return 'Meubles';
    if (key === 'view_more') return 'Voir plus';
    return key;
  };

  const products = [
    {
      id: 1,
      name: t('kitchen'),
      image: '/images/kitchen.jpg',
      description: 'Cuisines modernes et fonctionnelles',
      link: '/produits/cuisine'
    },
    {
      id: 2,
      name: t('dressing'),
      image: '/images/dressing.jpg',
      description: 'Dressings sur mesure et élégants',
      link: '/produits/dressing'
    },
    {
      id: 3,
      name: t('doors'),
      image: '/images/doors.jpg',
      description: 'Portes intérieures et extérieures',
      link: '/produits/portes'
    },
    {
      id: 4,
      name: t('furniture'),
      image: '/images/furniture.jpg',
      description: 'Meubles TV et salle de bain',
      link: '/produits/meubles'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            {t('hero_subtitle')}
          </p>
          <Link 
            href="/produits"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about_title')}</h2>
            <h3 className="text-2xl text-gray-600 mb-8">{t('about_subtitle')}</h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('about_text')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('products_title')}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">{product.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link 
                    href={product.link}
                    className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
                  >
                    {t('view_more')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Nous offrons plus que de simples services de qualité
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Découvrez notre catalogue complet et trouvez l'inspiration pour votre projet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/produits"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              CATALOGUE
            </Link>
            <Link 
              href="/sur-mesure"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              Demande de devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
