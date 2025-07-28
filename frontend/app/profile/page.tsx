"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const translations = {
  fr: {
    title: "Mon Profil",
    subtitle: "Gérez vos informations personnelles",
    name: "Nom complet",
    email: "Adresse e-mail",
    role: "Rôle",
    save: "Sauvegarder",
    cancel: "Annuler",
    loading: "Sauvegarde...",
    success: "Profil mis à jour avec succès",
    error: "Erreur lors de la mise à jour"
  },
  en: {
    title: "My Profile",
    subtitle: "Manage your personal information",
    name: "Full Name",
    email: "Email Address",
    role: "Role",
    save: "Save",
    cancel: "Cancel",
    loading: "Saving...",
    success: "Profile updated successfully",
    error: "Error updating profile"
  },
  ar: {
    title: "ملفي الشخصي",
    subtitle: "إدارة معلوماتك الشخصية",
    name: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    role: "الدور",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري الحفظ...",
    success: "تم تحديث الملف الشخصي بنجاح",
    error: "خطأ في تحديث الملف الشخصي"
  }
};

const schema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user: hookUser, isAuthenticated: hookIsAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // État local pour l'authentification
  const [localUser, setLocalUser] = useState(null);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false);

  const t = translations[locale as keyof typeof translations] || translations.fr;

  // Charger les données depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setLocalUser(userData);
          setLocalIsAuthenticated(true);
          console.log('✅ ProfilePage: Utilisateur chargé depuis localStorage:', userData);
        } catch (error) {
          console.error('❌ ProfilePage: Erreur parsing user:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  // Utiliser les données locales si le hook ne fonctionne pas
  const user = localUser || hookUser;
  const isAuthenticated = localIsAuthenticated || hookIsAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('❌ ProfilePage: Utilisateur non authentifié, redirection vers /login');
      router.push('/login');
    } else {
      console.log('✅ ProfilePage: Utilisateur authentifié:', user);
    }
  }, [isAuthenticated, router, user]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Ici, vous pourriez appeler l'API pour mettre à jour le profil
      console.log('Mise à jour du profil:', data);
      
      // Simulation d'une mise à jour
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: t.success });
    } catch (error) {
      setMessage({ type: 'error', text: t.error });
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher un loader pendant la vérification d'authentification
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.name}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.role}
              </label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-md ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t.loading : t.save}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 