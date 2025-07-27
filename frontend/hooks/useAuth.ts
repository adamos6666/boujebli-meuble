"use client";

import { useState, useEffect } from 'react';
import { apiCall, API_CONFIG } from '../lib/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}

export interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculer isAuthenticated basé sur user et token
  const isAuthenticated = !!(user && token);

  // Charger le token depuis localStorage au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Ne pas charger le profil automatiquement pour éviter l'erreur
      console.log('🔑 Token trouvé dans localStorage');
    }
  }, []);

  const loadUserProfile = async (authToken: string) => {
    try {
      console.log('👤 Chargement du profil utilisateur...');
      const userData = await apiCall<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE, {
        headers: getAuthHeaders(authToken),
      });
      console.log('✅ Profil utilisateur chargé:', userData);
      setUser(userData);
    } catch (err) {
      console.error('❌ Erreur lors du chargement du profil:', err);
      // Ne pas déconnecter l'utilisateur si le profil échoue
      // L'utilisateur peut continuer à utiliser l'application
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔐 Tentative de connexion pour:', email);
      const response = await apiCall<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      console.log('✅ Connexion réussie:', response);

      const accessToken = response.access_token || response.data?.access_token;
      if (!accessToken) {
        throw new Error('Token d\'accès non reçu');
      }

      setToken(accessToken);
      localStorage.setItem('token', accessToken);
      
      let userInfo: User | null = null;
      if (response.user) {
        userInfo = response.user;
      } else if (response.data?.user) {
        userInfo = response.data.user;
      } else {
        // Si pas d'infos utilisateur dans la réponse, créer un objet utilisateur basique
        console.log('🔄 Création d\'un objet utilisateur basique...');
        userInfo = {
          id: 0, // ID temporaire
          name: email.split('@')[0], // Nom basé sur l'email
          email: email,
          role: 'client'
        };
      }
      
      console.log('✅ Informations utilisateur:', userInfo);
      setUser(userInfo);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion';
      console.error('❌ Erreur de connexion:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📝 Tentative d\'inscription pour:', email);
      await apiCall(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      
      console.log('✅ Inscription réussie, connexion automatique...');
      await login(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur d\'inscription';
      console.error('❌ Erreur d\'inscription:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Déconnexion de l\'utilisateur');
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('token');
  };

  return { user, token, isLoading, isAuthenticated, login, register, logout, error };
}

// Fonction utilitaire pour ajouter le token d'authentification
function getAuthHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
} 