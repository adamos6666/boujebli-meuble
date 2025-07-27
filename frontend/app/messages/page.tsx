"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const translations = {
  fr: {
    title: "Messages",
    subtitle: "Vos conversations avec le support",
    noMessages: "Vous n'avez pas encore de messages",
    newMessage: "Nouveau message",
    send: "Envoyer",
    placeholder: "Tapez votre message...",
    support: "Support Boujebli Meuble",
    online: "En ligne",
    offline: "Hors ligne"
  },
  en: {
    title: "Messages",
    subtitle: "Your conversations with support",
    noMessages: "You don't have any messages yet",
    newMessage: "New message",
    send: "Send",
    placeholder: "Type your message...",
    support: "Boujebli Meuble Support",
    online: "Online",
    offline: "Offline"
  },
  ar: {
    title: "الرسائل",
    subtitle: "محادثاتك مع الدعم",
    noMessages: "ليس لديك أي رسائل بعد",
    newMessage: "رسالة جديدة",
    send: "إرسال",
    placeholder: "اكتب رسالتك...",
    support: "دعم بوجبلي موبل",
    online: "متصل",
    offline: "غير متصل"
  }
};

// Données mockées pour les messages
const mockMessages = [
  {
    id: 1,
    sender: "support",
    content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    timestamp: "2024-01-15T10:30:00",
    isRead: true
  },
  {
    id: 2,
    sender: "user",
    content: "Bonjour, j'aimerais avoir des informations sur vos cuisines personnalisées.",
    timestamp: "2024-01-15T10:32:00",
    isRead: true
  },
  {
    id: 3,
    sender: "support",
    content: "Bien sûr ! Nos cuisines personnalisées sont fabriquées sur mesure selon vos besoins. Pouvez-vous me donner plus de détails sur vos attentes ?",
    timestamp: "2024-01-15T10:35:00",
    isRead: false
  }
];

export default function MessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const t = translations[locale as keyof typeof translations] || translations.fr;

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'user',
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulation d'une réponse automatique
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'support',
          content: 'Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.',
          timestamp: new Date().toISOString(),
          isRead: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">{t.online}</span>
            </div>
          </div>
        </div>

        {/* Zone de chat */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t.noMessages}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez une conversation avec notre équipe de support.
              </p>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Zone de saisie */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t.placeholder}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t.send}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 