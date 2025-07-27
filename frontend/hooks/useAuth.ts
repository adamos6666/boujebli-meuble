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
      console.log('👤 Chargement du profil utilisateur...');
      const userData = await apiCall<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE, {
        headers: getAuthHeaders(authToken),
      });
      console.log('✅ Profil utilisateur chargé:', userData);
      setUser(userData);
    } catch (err) {
      console.error('❌ Erreur lors du chargement du profil:', err);
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
      console.log('🔐 Tentative de connexion pour:', email);
      
      const response = await apiCall<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      console.log('✅ Connexion réussie:', response);

      // Extraire le token de la réponse
      const accessToken = response.access_token || response.data?.access_token;
      if (!accessToken) {
        throw new Error('Token d\'accès non reçu');
      }

      setToken(accessToken);
      localStorage.setItem('token', accessToken);
      
      // Extraire les informations utilisateur
      let userInfo: User | null = null;
      
      if (response.user) {
        userInfo = response.user;
      } else if (response.data?.user) {
        userInfo = response.data.user;
      } else {
        // Si pas d'infos utilisateur dans la réponse, les charger séparément
        console.log('🔄 Chargement des informations utilisateur...');
        await loadUserProfile(accessToken);
        return; // loadUserProfile gère déjà setUser
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
      
      // Après inscription, connecter automatiquement
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