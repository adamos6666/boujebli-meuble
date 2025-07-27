"use client";
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';

export default function AuthDebug() {
  const { user, isAuthenticated, token, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    user: null,
    localStorageToken: null,
    localStorageUser: null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const localStorageToken = localStorage.getItem('token');
      const localStorageUser = localStorage.getItem('user');
      
      setDebugInfo({
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        token: token,
        user: user,
        localStorageToken: localStorageToken,
        localStorageUser: localStorageUser ? JSON.parse(localStorageUser) : null
      });
    }
  }, [mounted, isAuthenticated, isLoading, token, user]);

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