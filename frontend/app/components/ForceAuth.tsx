"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForceAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
          setIsAuthenticated(true);
          console.log('✅ ForceAuth: Authentification forcée:', userData);
        } catch (error) {
          console.error('❌ ForceAuth: Erreur parsing user:', error);
        }
      }
    }
  }, []);

  const testPages = [
    { name: 'Profil', path: '/profile' },
    { name: 'Paramètres', path: '/settings' },
    { name: 'Mes Demandes', path: '/my-requests' },
    { name: 'Favoris', path: '/favorites' },
    { name: 'Messages', path: '/messages' }
  ];

  const navigateToPage = (path: string) => {
    console.log(`🧪 ForceAuth: Navigation vers ${path}`);
    router.push(path);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 rounded-lg text-sm z-50">
        <h3 className="font-bold mb-2">❌ Non Authentifié</h3>
        <p>Connectez-vous d'abord</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg text-sm z-50 max-w-xs">
      <h3 className="font-bold mb-2">✅ Authentifié</h3>
      <p className="mb-2">Utilisateur: {user?.name}</p>
      <p className="mb-3">Email: {user?.email}</p>
      
      <div className="space-y-2">
        <p className="font-semibold">Test des pages:</p>
        {testPages.map((page) => (
          <button
            key={page.path}
            onClick={() => navigateToPage(page.path)}
            className="block w-full text-left px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
          >
            {page.name}
          </button>
        ))}
      </div>
    </div>
  );
} 