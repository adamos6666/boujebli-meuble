// Configuration API pour le frontend
export const API_CONFIG = {
  BASE_URL: 'https://boujebli-meuble-backend.onrender.com', // Utiliser l'API de production temporairement
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/user/profile',
    },
    PRODUCTS: {
      STANDARD: '/produit-standard',
      CUSTOM: '/demande-sur-mesure',
    },
    TRANSLATIONS: '/traduction',
  },
};

// Types pour les réponses API
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ProduitStandard {
  id: number;
  titre: string;
  description: string;
  image?: string;
  langues: string[];
}

export interface DemandeSurMesure {
  id: number;
  nom: string;
  dimensions: string;
  image?: string;
  clientId: number;
}

export interface Traduction {
  id: number;
  cle: string;
  valeur: string;
  langue: string;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}

// Fonction utilitaire pour les appels API
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  console.log('🌐 Appel API:', url);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  console.log('📡 Réponse API:', response.status, response.statusText);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('❌ Erreur API:', errorData);
    throw new Error(errorData.message || `Erreur API: ${response.status}`);
  }

  const data = await response.json();
  console.log('✅ Données reçues:', data);
  return data;
}

// Fonction pour ajouter le token d'authentification
export function getAuthHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
} 