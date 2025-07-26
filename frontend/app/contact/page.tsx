"use client";
import { useState } from 'react';
import { useHeaderTranslations } from '../hooks/useHeaderTranslations';

const contactTranslations = {
  fr: {
    title: "Contactez-nous",
    subtitle: "Nous sommes là pour vous aider",
    description: "N'hésitez pas à nous contacter pour toute question concernant nos produits ou services.",
    name: "Nom complet",
    email: "Adresse e-mail",
    phone: "Téléphone",
    subject: "Sujet",
    message: "Message",
    send: "Envoyer le message",
    address: "Adresse",
    addressValue: "123 Rue de la Meuble, Tunis 1000",
    phoneValue: "+216 71 234 567",
    emailValue: "contact@boujebli-meuble.tn",
    workingHours: "Heures d'ouverture",
    workingHoursValue: "Lun - Ven: 8h00 - 18h00\nSam: 9h00 - 16h00",
    formSuccess: "Message envoyé avec succès !",
    formError: "Erreur lors de l'envoi du message.",
  },
  en: {
    title: "Contact Us",
    subtitle: "We're here to help",
    description: "Don't hesitate to contact us for any questions about our products or services.",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    address: "Address",
    addressValue: "123 Furniture Street, Tunis 1000",
    phoneValue: "+216 71 234 567",
    emailValue: "contact@boujebli-meuble.tn",
    workingHours: "Working Hours",
    workingHoursValue: "Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM",
    formSuccess: "Message sent successfully!",
    formError: "Error sending message.",
  },
  ar: {
    title: "اتصل بنا",
    subtitle: "نحن هنا لمساعدتك",
    description: "لا تتردد في الاتصال بنا لأي أسئلة حول منتجاتنا أو خدماتنا.",
    name: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    phone: "الهاتف",
    subject: "الموضوع",
    message: "الرسالة",
    send: "إرسال الرسالة",
    address: "العنوان",
    addressValue: "123 شارع الأثاث، تونس 1000",
    phoneValue: "+216 71 234 567",
    emailValue: "contact@boujebli-meuble.tn",
    workingHours: "ساعات العمل",
    workingHoursValue: "الإثنين - الجمعة: 8:00 - 18:00\nالسبت: 9:00 - 16:00",
    formSuccess: "تم إرسال الرسالة بنجاح!",
    formError: "خطأ في إرسال الرسالة.",
  },
};

export default function ContactPage() {
  const { translations: headerTranslations } = useHeaderTranslations();
  const [locale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'fr';
    }
    return 'fr';
  });
  const translations = contactTranslations[locale as keyof typeof contactTranslations] || contactTranslations.fr;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    alert(translations.formSuccess);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{translations.title}</h2>
            <p className="text-gray-600 mb-8">{translations.description}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{translations.subject}</option>
                    <option value="devis">Demande de devis</option>
                    <option value="renseignements">Renseignements</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                {translations.send}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{translations.address}</h4>
                    <p className="text-gray-600">{translations.addressValue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{translations.phone}</h4>
                    <p className="text-gray-600">{translations.phoneValue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{translations.emailValue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{translations.workingHours}</h4>
                    <p className="text-gray-600 whitespace-pre-line">{translations.workingHoursValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre localisation</h3>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Carte interactive à intégrer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 