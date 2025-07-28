"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const translations = {
  fr: {
    title: "Messages",
    subtitle: "Communiquez avec notre équipe",
    sendMessage: "Envoyer un message",
    placeholder: "Tapez votre message...",
    send: "Envoyer",
    loading: "Envoi...",
    noMessages: "Aucun message pour le moment",
    support: "Support",
    online: "En ligne",
    offline: "Hors ligne"
  },
  en: {
    title: "Messages",
    subtitle: "Communicate with our team",
    sendMessage: "Send a message",
    placeholder: "Type your message...",
    send: "Send",
    loading: "Sending...",
    noMessages: "No messages yet",
    support: "Support",
    online: "Online",
    offline: "Offline"
  },
  ar: {
    title: "الرسائل",
    subtitle: "تواصل مع فريقنا",
    sendMessage: "إرسال رسالة",
    placeholder: "اكتب رسالتك...",
    send: "إرسال",
    loading: "جاري الإرسال...",
    noMessages: "لا توجد رسائل بعد",
    support: "الدعم",
    online: "متصل",
    offline: "غير متصل"
  }
};

// Données mockées pour les messages
const mockMessages = [
  {
    id: 1,
    type: 'received',
    content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
    timestamp: '2024-01-15T10:30:00',
    sender: 'Support'
  },
  {
    id: 2,
    type: 'sent',
    content: 'Bonjour, j\'aimerais avoir des informations sur vos cuisines sur mesure.',
    timestamp: '2024-01-15T10:32:00',
    sender: 'Vous'
  },
  {
    id: 3,
    type: 'received',
    content: 'Bien sûr ! Nos cuisines sur mesure sont fabriquées avec des matériaux de qualité. Pouvez-vous me donner plus de détails sur vos besoins ?',
    timestamp: '2024-01-15T10:35:00',
    sender: 'Support'
  }
];

export default function MessagesPage() {
  const { user: hookUser, isAuthenticated: hookIsAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // État local pour l'authentification
  const [localUser, setLocalUser] = useState(null);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false);

  const t = translations[locale as keyof typeof translations] || translations.fr;

  // Charger les données depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setLocalUser(userData);
          setLocalIsAuthenticated(true);
          console.log('✅ MessagesPage: Utilisateur chargé depuis localStorage:', userData);
        } catch (error) {
          console.error('❌ MessagesPage: Erreur parsing user:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  // Utiliser les données locales si le hook ne fonctionne pas
  const user = localUser || hookUser;
  const isAuthenticated = localIsAuthenticated || hookIsAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('❌ MessagesPage: Utilisateur non authentifié, redirection vers /login');
      router.push('/login');
    } else {
      console.log('✅ MessagesPage: Utilisateur authentifié:', user);
    }
  }, [isAuthenticated, router, user]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    
    // Simuler l'envoi d'un message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const message = {
      id: messages.length + 1,
      type: 'sent' as const,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: 'Vous'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsLoading(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Afficher un loader pendant la vérification d'authentification
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* En-tête du chat */}
          <div className="bg-blue-600 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-semibold">{t.support}</h3>
                  <p className="text-sm text-blue-100">{t.online}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zone des messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-500">{t.noMessages}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'sent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t.loading : t.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 