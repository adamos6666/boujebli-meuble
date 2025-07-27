"use client";
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function TestApiPage() {
  const [status, setStatus] = useState<string>('Chargement...');
  const [produits, setProduits] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        // Test de la route health
        const healthResponse = await fetch('http://localhost:3001/health');
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          setStatus(`API OK - ${healthData.status} (${healthData.timestamp})`);
        } else {
          setStatus(`API Error - Status: ${healthResponse.status}`);
        }

        // Test des produits
        const produitsData = await apiService.getProduitsStandards();
        setProduits(produitsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setStatus('Erreur de connexion');
      }
    };

    testApi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test de l'API</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statut de l'API</h2>
          <p className="text-lg">{status}</p>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Erreur :</strong> {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Produits ({produits.length})</h2>
          {produits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produits.map((produit) => (
                <div key={produit.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{produit.titre}</h3>
                  <p className="text-gray-600 text-sm mt-2">{produit.description}</p>
                  {produit.image && (
                    <img 
                      src={produit.image} 
                      alt={produit.titre}
                      className="w-full h-32 object-cover rounded mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucun produit trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
} 