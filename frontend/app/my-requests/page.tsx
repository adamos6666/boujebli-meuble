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
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [requests, setRequests] = useState(mockRequests);

  const t = translations[locale as keyof typeof translations] || translations.fr;

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.createRequest}
            </Link>
          </div>
        </div>

        {/* Liste des demandes */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t.noRequests}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par créer votre première demande sur mesure.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t.createRequest}
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Demande
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.dimensions}
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
                              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{request.nom}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.dimensions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                          {t[request.status as keyof typeof t]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
          )}
        </div>
      </div>
    </div>
  );
} 