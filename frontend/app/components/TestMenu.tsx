"use client";
import { useState } from 'react';

export default function TestMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white"
      >
        👤
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">Test Menu</p>
            <p className="text-sm text-gray-500">Utilisateur de test</p>
          </div>
          <div className="py-2">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Mon Profil
            </a>
            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Paramètres
            </a>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 