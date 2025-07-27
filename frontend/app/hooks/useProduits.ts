"use client";
import { useState, useEffect } from 'react';
import { apiService, ProduitStandard } from '../services/api';
import { getRealProductImage } from '../config/real-images';

// Données mockées pour les tests
const mockProduits: ProduitStandard[] = [
  // Cuisines (4 images)
  {
    id: 1,
    titre: "Cuisine Vintage",
    description: "Cuisine élégante style vintage avec finitions soignées en bois massif.",
    image: getRealProductImage("cuisines", 0),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 2,
    titre: "Cuisine Velvety",
    description: "Cuisine moderne avec revêtement velours et design épuré.",
    image: getRealProductImage("cuisines", 1),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 3,
    titre: "Cuisine Eternal Shine",
    description: "Cuisine avec finitions brillantes et éclairage intégré.",
    image: getRealProductImage("cuisines", 2),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 4,
    titre: "Cuisine Moderne",
    description: "Cuisine contemporaine avec équipements haut de gamme.",
    image: getRealProductImage("cuisines", 3),
    langues: ["fr", "en", "ar"]
  },
  // Portes (2 images)
  {
    id: 5,
    titre: "Porte Chêne Intérieur",
    description: "Porte intérieure en chêne massif avec finitions naturelles.",
    image: getRealProductImage("portes", 0),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 6,
    titre: "Porte Pivot Extérieur",
    description: "Porte extérieure à pivot avec sécurité renforcée.",
    image: getRealProductImage("portes", 1),
    langues: ["fr", "en", "ar"]
  },
  // Dressing (2 images)
  {
    id: 7,
    titre: "Dressing à la Française",
    description: "Dressing élégant style français avec placage noble.",
    image: getRealProductImage("dressing", 0),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 8,
    titre: "Dressing Coulissant",
    description: "Dressing avec portes coulissantes pour gain d'espace.",
    image: getRealProductImage("dressing", 1),
    langues: ["fr", "en", "ar"]
  },
  // Meubles (4 images)
  {
    id: 9,
    titre: "Meuble TV",
    description: "Meuble TV moderne et fonctionnel avec rangement optimisé.",
    image: getRealProductImage("meubles", 0),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 10,
    titre: "Meuble Salle de Bain",
    description: "Meuble de salle de bain élégant et résistant à l'humidité.",
    image: getRealProductImage("meubles", 1),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 11,
    titre: "Meuble Bureau",
    description: "Bureau design avec rangements intégrés.",
    image: getRealProductImage("meubles", 2),
    langues: ["fr", "en", "ar"]
  },
  {
    id: 12,
    titre: "Meuble Chambre",
    description: "Meuble de chambre moderne et épuré.",
    image: getRealProductImage("meubles", 3),
    langues: ["fr", "en", "ar"]
  }
];

export function useProduits(langue?: string) {
  const [produits, setProduits] = useState<ProduitStandard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TEMPORAIRE: Utiliser toujours les données mockées en attendant que l'API soit corrigée
        console.log('⚠️ Utilisation temporaire des données mockées');
        let filteredData = mockProduits;
        if (langue) {
          filteredData = mockProduits.filter(produit => 
            produit.langues.includes(langue)
          );
        }
        setProduits(filteredData);
        console.log('✅ Données mockées utilisées:', filteredData.length, 'produits');
        
        // Code original commenté temporairement
        /*
        // Essayer de récupérer les données depuis l'API
        const data = await apiService.getProduitsStandards(langue);
        
        // Vérifier que data est bien un tableau
        if (Array.isArray(data)) {
          setProduits(data);
          console.log('✅ Données récupérées depuis l\'API:', data.length, 'produits');
        } else {
          console.warn('⚠️ L\'API a retourné un objet au lieu d\'un tableau:', data);
          throw new Error('Format de données invalide');
        }
        */
      } catch (err) {
        console.warn('⚠️ Erreur API, utilisation des données mockées:', err);
        
        // Utiliser les données mockées en cas d'erreur (sans définir d'erreur)
        let filteredData = mockProduits;
        if (langue) {
          filteredData = mockProduits.filter(produit => 
            produit.langues.includes(langue)
          );
        }
        setProduits(filteredData);
        console.log('✅ Données mockées utilisées:', filteredData.length, 'produits');
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, [langue]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProduitsStandards(langue);
      
      // Vérifier que data est bien un tableau
      if (Array.isArray(data)) {
        setProduits(data);
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (err) {
      // Utiliser les données mockées en cas d'erreur (sans définir d'erreur)
      let filteredData = mockProduits;
      if (langue) {
        filteredData = mockProduits.filter(produit => 
          produit.langues.includes(langue)
        );
      }
      setProduits(filteredData);
    } finally {
      setLoading(false);
    }
  };

  return { produits, loading, error, refetch };
}

export function useProduit(id: number) {
  const [produit, setProduit] = useState<ProduitStandard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProduitStandard(id);
        setProduit(data);
      } catch (err) {
        setError('Erreur de connexion au serveur, affichage des données de démonstration');
        const mockProduit = mockProduits.find(p => p.id === id);
        setProduit(mockProduit || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduit();
  }, [id]);

  return { produit, loading, error };
} 