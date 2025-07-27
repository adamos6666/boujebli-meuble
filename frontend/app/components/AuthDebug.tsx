"use client";
import { useAuth } from '../hooks/useAuth';

export default function AuthDebug() {
  const { user, isAuthenticated, token, isLoading } = useAuth();

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs z-50">
      <h3 className="font-bold mb-2">🔍 Debug Auth</h3>
      <div>
        <p>isAuthenticated: {isAuthenticated ? '✅' : '❌'}</p>
        <p>isLoading: {isLoading ? '⏳' : '✅'}</p>
        <p>Token: {token ? '✅' : '❌'}</p>
        <p>User: {user ? '✅' : '❌'}</p>
        {user && (
          <div className="mt-2">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
} 