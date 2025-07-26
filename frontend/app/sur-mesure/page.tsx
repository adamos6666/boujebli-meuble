const translations = {
  fr: {
    title: 'Meubles sur mesure',
    content: 'Demandez un meuble personnalisé selon vos envies.'
  },
  en: {
    title: 'Custom-made Furniture',
    content: 'Request a custom piece of furniture tailored to your needs.'
  },
  ar: {
    title: 'تفصيل حسب الطلب',
    content: 'اطلب قطعة أثاث مخصصة حسب رغبتك.'
  }
};

export default function SurMesurePage() {
  const locale = typeof window !== 'undefined' ? (window.location.pathname.split('/')[1] || 'fr') : 'fr';
  const t = translations[locale] || translations.fr;
  return (
    <section className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
      <p>{t.content}</p>
    </section>
  );
} 