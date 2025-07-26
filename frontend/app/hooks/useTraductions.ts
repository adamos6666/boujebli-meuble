"use client";
import { useState, useEffect } from 'react';
import { apiService, Traduction } from '../services/api';

export function useTraductions(langue?: string) {
  const [traductions, setTraductions] = useState<Traduction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTraductions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getTraductions(langue);
        setTraductions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des traductions');
        console.error('Erreur lors du chargement des traductions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraductions();
  }, [langue]);

  const getTraduction = (cle: string): string => {
    const traduction = traductions.find(t => t.cle === cle);
    return traduction ? traduction.valeur : cle;
  };

  return { traductions, loading, error, getTraduction };
} 