"use client";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const translations = {
  fr: {
    title: "Paramètres",
    subtitle: "Gérez vos préférences",
    language: "Langue",
    notifications: "Notifications",
    emailNotifications: "Notifications par email",
    smsNotifications: "Notifications par SMS",
    privacy: "Confidentialité",
    profileVisibility: "Visibilité du profil",
    dataSharing: "Partage de données",
    security: "Sécurité",
    changePassword: "Changer le mot de passe",
    twoFactorAuth: "Authentification à deux facteurs",
    save: "Sauvegarder",
    cancel: "Annuler",
    loading: "Sauvegarde...",
    success: "Paramètres mis à jour avec succès",
    error: "Erreur lors de la mise à jour"
  },
  en: {
    title: "Settings",
    subtitle: "Manage your preferences",
    language: "Language",
    notifications: "Notifications",
    emailNotifications: "Email notifications",
    smsNotifications: "SMS notifications",
    privacy: "Privacy",
    profileVisibility: "Profile visibility",
    dataSharing: "Data sharing",
    security: "Security",
    changePassword: "Change password",
    twoFactorAuth: "Two-factor authentication",
    save: "Save",
    cancel: "Cancel",
    loading: "Saving...",
    success: "Settings updated successfully",
    error: "Error updating settings"
  },
  ar: {
    title: "الإعدادات",
    subtitle: "إدارة تفضيلاتك",
    language: "اللغة",
    notifications: "الإشعارات",
    emailNotifications: "إشعارات البريد الإلكتروني",
    smsNotifications: "إشعارات الرسائل النصية",
    privacy: "الخصوصية",
    profileVisibility: "رؤية الملف الشخصي",
    dataSharing: "مشاركة البيانات",
    security: "الأمان",
    changePassword: "تغيير كلمة المرور",
    twoFactorAuth: "المصادقة الثنائية",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري الحفظ...",
    success: "تم تحديث الإعدادات بنجاح",
    error: "خطأ في تحديث الإعدادات"
  }
};

export default function SettingsPage() {
  const { user: hookUser, isAuthenticated: hookIsAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // État local pour l'authentification
  const [localUser, setLocalUser] = useState(null);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false);
  
  // États des paramètres
  const [settings, setSettings] = useState({
    language: 'fr',
    emailNotifications: true,
    smsNotifications: false,
    profileVisibility: 'public',
    dataSharing: true,
    twoFactorAuth: false
  });

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
          console.log('✅ SettingsPage: Utilisateur chargé depuis localStorage:', userData);
        } catch (error) {
          console.error('❌ SettingsPage: Erreur parsing user:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
    setSettings(prev => ({ ...prev, language: savedLocale }));
  }, []);

  // Utiliser les données locales si le hook ne fonctionne pas
  const user = localUser || hookUser;
  const isAuthenticated = localIsAuthenticated || hookIsAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('❌ SettingsPage: Utilisateur non authentifié, redirection vers /login');
      router.push('/login');
    } else {
      console.log('✅ SettingsPage: Utilisateur authentifié:', user);
    }
  }, [isAuthenticated, router, user]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setSettings(prev => ({ ...prev, language: newLocale }));
    localStorage.setItem('locale', newLocale);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Ici, vous pourriez appeler l'API pour sauvegarder les paramètres
      console.log('Sauvegarde des paramètres:', settings);
      
      // Simulation d'une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: t.success });
    } catch (error) {
      setMessage({ type: 'error', text: t.error });
    } finally {
      setIsLoading(false);
    }
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
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          {message && (
            <div className={`p-4 rounded-md mb-6 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Langue */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.language}</h3>
              <div className="space-y-2">
                {[
                  { value: 'fr', label: 'Français' },
                  { value: 'en', label: 'English' },
                  { value: 'ar', label: 'العربية' }
                ].map((lang) => (
                  <label key={lang.value} className="flex items-center">
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={settings.language === lang.value}
                      onChange={() => handleLanguageChange(lang.value)}
                      className="mr-2"
                    />
                    {lang.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.notifications}</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="mr-2"
                  />
                  {t.emailNotifications}
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                    className="mr-2"
                  />
                  {t.smsNotifications}
                </label>
              </div>
            </div>

            {/* Confidentialité */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.privacy}</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.profileVisibility}
                  </label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Privé</option>
                    <option value="friends">Amis seulement</option>
                  </select>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.dataSharing}
                    onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                    className="mr-2"
                  />
                  {t.dataSharing}
                </label>
              </div>
            </div>

            {/* Sécurité */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.security}</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  {t.changePassword}
                </button>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    className="mr-2"
                  />
                  {t.twoFactorAuth}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t.loading : t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 