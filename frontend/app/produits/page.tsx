const translations = {
  fr: {
    title: 'Produits standards',
    content: 'Découvrez nos meubles standards de qualité.'
  },
  en: {
    title: 'Standard Products',
    content: 'Discover our quality standard furniture.'
  },
  ar: {
    title: 'منتجات قياسية',
    content: 'اكتشف أثاثنا القياسي عالي الجودة.'
  }
};

export default function ProduitsPage() {
  const locale = typeof window !== 'undefined' ? (window.location.pathname.split('/')[1] || 'fr') : 'fr';
  const t = translations[locale] || translations.fr;
  return (
    <section className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
      <p>{t.content}</p>
    </section>
  );
} 