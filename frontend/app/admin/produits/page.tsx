"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ProduitStandard, apiCall, getAuthHeaders, API_CONFIG } from '../../../lib/api';

const translations = {
  fr: {
    title: "Gestion des Produits Standards",
    addProduct: "Ajouter un produit",
    editProduct: "Modifier le produit",
    deleteProduct: "Supprimer le produit",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ce produit ?",
    noProducts: "Aucun produit disponible",
    loading: "Chargement...",
    actions: "Actions",
    titre: "Titre",
    description: "Description",
    image: "Image URL",
    langues: "Langues",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    close: "Fermer"
  },
  en: {
    title: "Standard Products Management",
    addProduct: "Add product",
    editProduct: "Edit product",
    deleteProduct: "Delete product",
    confirmDelete: "Are you sure you want to delete this product?",
    noProducts: "No products available",
    loading: "Loading...",
    actions: "Actions",
    titre: "Title",
    description: "Description",
    image: "Image URL",
    langues: "Languages",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    close: "Close"
  },
  ar: {
    title: "إدارة المنتجات القياسية",
    addProduct: "إضافة منتج",
    editProduct: "تعديل المنتج",
    deleteProduct: "حذف المنتج",
    confirmDelete: "هل أنت متأكد من حذف هذا المنتج؟",
    noProducts: "لا توجد منتجات متاحة",
    loading: "جاري التحميل...",
    actions: "الإجراءات",
    titre: "العنوان",
    description: "الوصف",
    image: "رابط الصورة",
    langues: "اللغات",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    close: "إغلاق"
  }
};

export default function AdminProduitsPage() {
  const locale = typeof window !== "undefined" ? (window.location.pathname.split("/")[1] || "fr") : "fr";
  const t = translations[locale] || translations.fr;
  const { user, token } = useAuth();
  const router = useRouter();
  
  const [produits, setProduits] = useState<ProduitStandard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProduitStandard | null>(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    image: '',
    langues: ['fr']
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    loadProduits();
  }, [user, router]);

  const loadProduits = async () => {
    try {
      setLoading(true);
      const data = await apiCall<ProduitStandard[]>(API_CONFIG.ENDPOINTS.PRODUCTS.STANDARD, {
        headers: getAuthHeaders(token)
      });
      setProduits(data);
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingProduct) {
        await apiCall(`${API_CONFIG.ENDPOINTS.PRODUCTS.STANDARD}/${editingProduct.id}`, {
          method: 'PATCH',
          headers: getAuthHeaders(token),
          body: JSON.stringify(formData)
        });
      } else {
        await apiCall(API_CONFIG.ENDPOINTS.PRODUCTS.STANDARD, {
          method: 'POST',
          headers: getAuthHeaders(token),
          body: JSON.stringify(formData)
        });
      }
      
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ titre: '', description: '', image: '', langues: ['fr'] });
      loadProduits();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
    }
  };

  const handleEdit = (product: ProduitStandard) => {
    setEditingProduct(product);
    setFormData({
      titre: product.titre,
      description: product.description,
      image: product.image || '',
      langues: product.langues
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!token || !confirm(t.confirmDelete)) return;

    try {
      await apiCall(`${API_CONFIG.ENDPOINTS.PRODUCTS.STANDARD}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
      });
      loadProduits();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      langues: [...prev.langues, 'fr']
    }));
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      langues: prev.langues.filter((_, i) => i !== index)
    }));
  };

  const updateLanguage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      langues: prev.langues.map((lang, i) => i === index ? value : lang)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retour au panel
              </button>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({ titre: '', description: '', image: '', langues: ['fr'] });
                  setShowModal(true);
                }}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t.addProduct}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {produits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t.noProducts}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.titre}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.description}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.langues}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produits.map((produit) => (
                  <tr key={produit.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{produit.titre}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">
                        {produit.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {produit.langues.map((langue) => (
                          <span
                            key={langue}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {langue.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(produit)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        {t.editProduct}
                      </button>
                      <button
                        onClick={() => handleDelete(produit.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        {t.deleteProduct}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProduct ? t.editProduct : t.addProduct}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.titre}
                  </label>
                  <input
                    type="text"
                    value={formData.titre}
                    onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.description}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.image}
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.langues}
                  </label>
                  {formData.langues.map((langue, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <select
                        value={langue}
                        onChange={(e) => updateLanguage(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                      {formData.langues.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Ajouter une langue
                  </button>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    {t.save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 