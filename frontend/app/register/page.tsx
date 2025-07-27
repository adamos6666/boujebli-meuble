"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const translations = {
  fr: {
    title: "Créer un compte",
    subtitle: "Rejoignez Boujebli Meuble",
    name: "Nom complet",
    email: "Adresse e-mail",
    password: "Mot de passe",
    submit: "Créer votre compte",
    loading: "Création...",
    hasAccount: "Vous avez déjà un compte ?",
    login: "Se connecter",
    or: "ou"
  },
  en: {
    title: "Create Account",
    subtitle: "Join Boujebli Meuble",
    name: "Full Name",
    email: "Email address",
    password: "Password",
    submit: "Create your account",
    loading: "Creating...",
    hasAccount: "Already have an account?",
    login: "Sign in",
    or: "or"
  },
  ar: {
    title: "إنشاء حساب",
    subtitle: "انضم إلى بوجبلي موبل",
    name: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "إنشاء حسابك",
    loading: "جاري الإنشاء...",
    hasAccount: "لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    or: "أو"
  }
};

const schema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [locale, setLocale] = useState('fr');
  const t = translations[locale as keyof typeof translations] || translations.fr;
  const { register: registerUser, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.name, data.email, data.password);
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Boujebli Meuble</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre nom complet"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t.loading : t.submit}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t.or}</span>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t.hasAccount}{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                  {t.login}
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="relative h-32 bg-white overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">N</span>
        </div>
      </div>
    </div>
  );
} 