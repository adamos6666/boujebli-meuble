import { useState, useEffect } from 'react';
import { apiCall, getAuthHeaders, API_CONFIG, User, AuthResponse } from '../lib/api';

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger le token depuis localStorage au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Charger les informations utilisateur
      loadUserProfile(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserProfile = async (authToken: string) => {
    try {
      const userData = await apiCall<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE, {
        headers: getAuthHeaders(authToken),
      });
      setUser(userData);
    } catch (err) {
      console.error('Erreur lors du chargement du profil:', err);
      // Token invalide, le supprimer
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiCall<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setToken(response.access_token);
      localStorage.setItem('token', response.access_token);
      
      // Charger les informations utilisateur
      if (response.user) {
        setUser(response.user);
      } else {
        await loadUserProfile(response.access_token);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await apiCall(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      
      // Après inscription, connecter automatiquement
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'inscription');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('token');
  };

  return {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    error,
  };
} 