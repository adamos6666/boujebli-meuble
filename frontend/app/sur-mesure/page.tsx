"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { apiCall, getAuthHeaders, API_CONFIG } from "../../lib/api";
import { useRouter } from "next/navigation";

const translations = {
  fr: {
    title: "Demande de Meuble sur Mesure",
    subtitle: "Décrivez votre projet et nous vous contacterons pour un devis personnalisé",
    nom: "Nom du meuble",
    dimensions: "Dimensions (L x l x h en cm)",
    description: "Description détaillée",
    image: "Image de référence (optionnel)",
    submit: "Envoyer la demande",
    success: "Demande envoyée avec succès !",
    loginRequired: "Vous devez être connecté pour faire une demande",
    errors: {
      nom: "Le nom du meuble est requis",
      dimensions: "Les dimensions sont requises",
      description: "La description est requise"
    }
  },
  en: {
    title: "Custom Furniture Request",
    subtitle: "Describe your project and we'll contact you for a personalized quote",
    nom: "Furniture name",
    dimensions: "Dimensions (L x W x H in cm)",
    description: "Detailed description",
    image: "Reference image (optional)",
    submit: "Send request",
    success: "Request sent successfully!",
    loginRequired: "You must be logged in to make a request",
    errors: {
      nom: "Furniture name is required",
      dimensions: "Dimensions are required",
      description: "Description is required"
    }
  },
  ar: {
    title: "طلب أثاث مخصص",
    subtitle: "صف مشروعك وسنتصل بك للحصول على عرض أسعار مخصص",
    nom: "اسم الأثاث",
    dimensions: "الأبعاد (ط × ع × ار في سم)",
    description: "وصف مفصل",
    image: "صورة مرجعية (اختياري)",
    submit: "إرسال الطلب",
    success: "تم إرسال الطلب بنجاح!",
    loginRequired: "يجب أن تكون مسجل الدخول لتقديم طلب",
    errors: {
      nom: "اسم الأثاث مطلوب",
      dimensions: "الأبعاد مطلوبة",
      description: "الوصف مطلوب"
    }
  }
};

const schema = z.object({
  nom: z.string().min(1, "Le nom du meuble est requis"),
  dimensions: z.string().min(1, "Les dimensions sont requises"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  image: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function SurMesurePage() {
  const locale = typeof window !== "undefined" ? (window.location.pathname.split("/")[1] || "fr") : "fr";
  const t = translations[locale] || translations.fr;
  const { user, token } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    if (!user || !token) {
      alert(t.loginRequired);
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiCall(API_CONFIG.ENDPOINTS.PRODUCTS.CUSTOM, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({
          ...data,
          clientId: user.id
        }),
      });
      
      setSuccess(true);
      reset();
      
      // Rediriger vers la page d'accueil après 2 secondes
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la demande:', err);
      alert('Erreur lors de l\'envoi de la demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-gray-600 mb-6">{t.loginRequired}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 mb-8">{t.subtitle}</p>

          {success ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t.success}</h2>
              <p className="text-gray-600">Redirection en cours...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.nom}
                </label>
                <input
                  type="text"
                  {...register("nom")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Ex: Table de salle à manger"
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.dimensions}
                </label>
                <input
                  type="text"
                  {...register("dimensions")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Ex: 180 x 90 x 75"
                />
                {errors.dimensions && (
                  <p className="text-red-500 text-sm mt-1">{errors.dimensions.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.description}
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Décrivez votre projet en détail..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.image}
                </label>
                <input
                  type="url"
                  {...register("image")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Envoi en cours..." : t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 