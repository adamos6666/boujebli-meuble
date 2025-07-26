"use client";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const translations = {
  fr: {
    title: "Panel d'Administration",
    subtitle: "Gérez vos produits, clients et demandes",
    accessDenied: "Accès refusé. Vous devez être administrateur.",
    loading: "Chargement...",
    sections: {
      products: "Produits Standards",
      requests: "Demandes sur Mesure",
      users: "Utilisateurs",
      translations: "Traductions"
    },
    welcome: "Bienvenue dans votre espace d'administration"
  },
  en: {
    title: "Admin Panel",
    subtitle: "Manage your products, clients and requests",
    accessDenied: "Access denied. You must be an administrator.",
    loading: "Loading...",
    sections: {
      products: "Standard Products",
      requests: "Custom Requests",
      users: "Users",
      translations: "Translations"
    },
    welcome: "Welcome to your admin panel"
  },
  ar: {
    title: "لوحة الإدارة",
    subtitle: "إدارة منتجاتك وعملائك وطلباتك",
    accessDenied: "تم رفض الوصول. يجب أن تكون مديرًا.",
    loading: "جاري التحميل...",
    sections: {
      products: "المنتجات القياسية",
      requests: "الطلبات المخصصة",
      users: "المستخدمون",
      translations: "الترجمات"
    },
    welcome: "مرحبًا بك في لوحة الإدارة"
  }
};

export default function AdminPage() {
  const locale = typeof window !== "undefined" ? (window.location.pathname.split("/")[1] || "fr") : "fr";
  const t = translations[locale] || translations.fr;
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-red-600 mb-6">{t.accessDenied}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const adminSections = [
    {
      title: t.sections.products,
      description: "Gérez votre catalogue de produits standards",
      href: "/admin/produits",
      icon: "📦"
    },
    {
      title: t.sections.requests,
      description: "Consultez et gérez les demandes sur mesure",
      href: "/admin/demandes",
      icon: "🔧"
    },
    {
      title: t.sections.users,
      description: "Gérez les comptes utilisateurs",
      href: "/admin/utilisateurs",
      icon: "👥"
    },
    {
      title: t.sections.translations,
      description: "Gérez les traductions du site",
      href: "/admin/traductions",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Connecté en tant que: {user.name}
              </span>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retour au site
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {t.welcome}, {user.name} !
          </h2>
          <p className="text-gray-600">
            Sélectionnez une section pour commencer à gérer votre site.
          </p>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {section.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {section.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Statistiques rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Produits standards</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Demandes en attente</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div className="text-sm text-gray-600">Utilisateurs totaux</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Traductions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 