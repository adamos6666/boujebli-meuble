"use client";
import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Récupérer l'état initial depuis localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('auth_user');
      return {
        user: user ? JSON.parse(user) : null,
        token,
        isAuthenticated: !!token,
      };
    }
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔐 Tentative de connexion pour:', email);
      const response = await apiService.login(email, password);
      
      console.log('✅ Connexion réussie:', response);
      
      // Extraire les informations utilisateur du token (décodage basique)
      const tokenPayload = JSON.parse(atob(response.access_token.split('.')[1]));
      const user: User = {
        id: tokenPayload.sub,
        email: tokenPayload.email,
        name: tokenPayload.name || email,
        role: tokenPayload.role || 'client',
      };

      // Sauvegarder dans localStorage
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      // Mettre à jour l'état
      setAuthState({
        user,
        token: response.access_token,
        isAuthenticated: true,
      });

      console.log('✅ Utilisateur connecté:', user);
      return user;
    } catch (err: any) {
      console.error('❌ Erreur de connexion:', err);
      const errorMessage = err.message || 'Erreur lors de la connexion';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📝 Tentative d\'inscription pour:', email);
      const user = await apiService.register(name, email, password);
      
      console.log('✅ Inscription réussie:', user);
      
      // Après inscription réussie, connecter automatiquement l'utilisateur
      await login(email, password);
      
      return user;
    } catch (err: any) {
      console.error('❌ Erreur d\'inscription:', err);
      const errorMessage = err.message || 'Erreur lors de l\'inscription';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    console.log('🚪 Déconnexion de l\'utilisateur');
    
    // Nettoyer localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Mettre à jour l'état
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
} 