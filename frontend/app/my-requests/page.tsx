"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const translations = {
  fr: {
    title: "Mes Demandes",
    subtitle: "Consultez vos demandes sur mesure",
    noRequests: "Vous n'avez pas encore de demandes",
    createRequest: "Créer une nouvelle demande",
    status: "Statut",
    date: "Date",
    actions: "Actions",
    view: "Voir",
    edit: "Modifier",
    delete: "Supprimer",
    pending: "En attente",
    approved: "Approuvée",
    rejected: "Rejetée",
    completed: "Terminée"
  },
  en: {
    title: "My Requests",
    subtitle: "View your custom requests",
    noRequests: "You don't have any requests yet",
    createRequest: "Create a new request",
    status: "Status",
    date: "Date",
    actions: "Actions",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    completed: "Completed"
  },
  ar: {
    title: "طلباتي",
    subtitle: "عرض طلباتك المخصصة",
    noRequests: "ليس لديك أي طلبات بعد",
    createRequest: "إنشاء طلب جديد",
    status: "الحالة",
    date: "التاريخ",
    actions: "الإجراءات",
    view: "عرض",
    edit: "تعديل",
    delete: "حذف",
    pending: "في الانتظار",
    approved: "موافق عليها",
    rejected: "مرفوضة",
    completed: "مكتملة"
  }
};

// Données mockées pour les demandes
const mockRequests = [
  {
    id: 1,
    nom: "Cuisine moderne",
    dimensions: "3m x 2.5m",
    status: "pending",
    date: "2024-01-15",
    image: "/images/cuisine-moderne.jpg"
  },
  {
    id: 2,
    nom: "Dressing élégant",
    dimensions: "4m x 2m",
    status: "approved",
    date: "2024-01-10",
    image: "/images/dressing-elegant.jpg"
  },
  {
    id: 3,
    nom: "Portes d'entrée",
    dimensions: "2.1m x 0.9m",
    status: "completed",
    date: "2024-01-05",
    image: "/images/portes-entree.jpg"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function MyRequestsPage() {
  const { user: hookUser, isAuthenticated: hookIsAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [requests, setRequests] = useState(mockRequests);
  
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
          console.log('✅ MyRequestsPage: Utilisateur chargé depuis localStorage:', userData);
        } catch (error) {
          console.error('❌ MyRequestsPage: Erreur parsing user:', error);
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
      console.log('❌ MyRequestsPage: Utilisateur non authentifié, redirection vers /login');
      router.push('/login');
    } else {
      console.log('✅ MyRequestsPage: Utilisateur authentifié:', user);
    }
  }, [isAuthenticated, router, user]);

  const handleDelete = (id: number) => {
    setRequests(prev => prev.filter(request => request.id !== id));
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t.pending;
      case 'approved': return t.approved;
      case 'rejected': return t.rejected;
      case 'completed': return t.completed;
      default: return status;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noRequests}</h3>
            <Link
              href="/sur-mesure"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.createRequest}
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{t.title}</h2>
                <Link
                  href="/sur-mesure"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t.createRequest}
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Demande
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.status}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.date}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{request.nom}</div>
                            <div className="text-sm text-gray-500">{request.dimensions}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            {t.view}
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            {t.edit}
                          </button>
                          <button 
                            onClick={() => handleDelete(request.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 