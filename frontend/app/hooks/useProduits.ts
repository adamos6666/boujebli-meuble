"use client";
import { useState, useEffect } from 'react';
import { apiService, ProduitStandard } from '../services/api';

export function useProduits(langue?: string) {
  const [produits, setProduits] = useState<ProduitStandard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProduitsStandards(langue);
        setProduits(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits');
        console.error('Erreur lors du chargement des produits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, [langue]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProduitsStandards(langue);
      setProduits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du rechargement des produits');
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
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du produit');
        console.error('Erreur lors du chargement du produit:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduit();
    }
  }, [id]);

  return { produit, loading, error };
} 