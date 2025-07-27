"use client";
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';

export default function AuthDebug() {
  const { user: hookUser, isAuthenticated: hookIsAuthenticated, token: hookToken, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    user: null,
    localStorageToken: null,
    localStorageUser: null,
    localIsAuthenticated: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const localStorageToken = localStorage.getItem('token');
      const localStorageUser = localStorage.getItem('user');
      
      let localIsAuthenticated = false;
      let localUser = null;
      
      if (localStorageToken && localStorageUser) {
        try {
          localUser = JSON.parse(localStorageUser);
          localIsAuthenticated = true;
        } catch (error) {
          console.error('❌ Erreur parsing localStorage user:', error);
        }
      }
      
      // Utiliser les données locales si le hook ne fonctionne pas
      const finalUser = localUser || hookUser;
      const finalToken = localStorageToken || hookToken;
      const finalIsAuthenticated = localIsAuthenticated || hookIsAuthenticated;
      
      setDebugInfo({
        isAuthenticated: finalIsAuthenticated,
        isLoading: isLoading,
        token: finalToken,
        user: finalUser,
        localStorageToken: localStorageToken,
        localStorageUser: localUser,
        localIsAuthenticated: localIsAuthenticated
      });
    }
  }, [mounted, hookUser, hookIsAuthenticated, hookToken, isLoading]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs z-50 max-w-sm">
      <h3 className="font-bold mb-2">🔍 Debug Auth</h3>
      <div className="space-y-1">
        <p>isAuthenticated: {debugInfo.isAuthenticated ? '✅' : '❌'}</p>
        <p>isLoading: {debugInfo.isLoading ? '⏳' : '✅'}</p>
        <p>Token (hook): {debugInfo.token ? '✅' : '❌'}</p>
        <p>Token (localStorage): {debugInfo.localStorageToken ? '✅' : '❌'}</p>
        <p>User (hook): {debugInfo.user ? '✅' : '❌'}</p>
        <p>User (localStorage): {debugInfo.localStorageUser ? '✅' : '❌'}</p>
        <p>Local Auth: {debugInfo.localIsAuthenticated ? '✅' : '❌'}</p>
        
        {debugInfo.user && (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <p className="font-semibold">User Info:</p>
            <p>Name: {debugInfo.user.name}</p>
            <p>Email: {debugInfo.user.email}</p>
            <p>Role: {debugInfo.user.role}</p>
          </div>
        )}
        
        {debugInfo.localStorageUser && (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <p className="font-semibold">localStorage User:</p>
            <p>Name: {debugInfo.localStorageUser.name}</p>
            <p>Email: {debugInfo.localStorageUser.email}</p>
            <p>Role: {debugInfo.localStorageUser.role}</p>
          </div>
        )}
      </div>
    </div>
  );
} 