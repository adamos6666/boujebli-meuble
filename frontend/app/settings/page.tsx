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
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
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

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'fr';
    setLocale(savedLocale);
    setSettings(prev => ({ ...prev, language: savedLocale }));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Sauvegarder la langue dans localStorage
      localStorage.setItem('locale', settings.language);
      setLocale(settings.language);
      
      // Simulation d'une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: t.success });
    } catch (error) {
      setMessage({ type: 'error', text: t.error });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Paramètres */}
        <div className="space-y-6">
          {/* Langue */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.language}</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="fr"
                  checked={settings.language === 'fr'}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="mr-3"
                />
                Français
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={settings.language === 'en'}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="mr-3"
                />
                English
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="ar"
                  checked={settings.language === 'ar'}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="mr-3"
                />
                العربية
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.notifications}</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="mr-3"
                />
                {t.emailNotifications}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                  className="mr-3"
                />
                {t.smsNotifications}
              </label>
            </div>
          </div>

          {/* Confidentialité */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.privacy}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.profileVisibility}
                </label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Privé</option>
                  <option value="friends">Amis uniquement</option>
                </select>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.dataSharing}
                  onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                  className="mr-3"
                />
                {t.dataSharing}
              </label>
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.security}</h3>
            <div className="space-y-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                {t.changePassword}
              </button>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  className="mr-3"
                />
                {t.twoFactorAuth}
              </label>
            </div>
          </div>

          {/* Message de succès/erreur */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Boutons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t.loading : t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 