"use client";
import { useState, useEffect, useCallback } from 'react';
import { useCache } from './useCache';
import { apiService } from '../services/api';

interface UseOptimizedApiOptions {
  cacheKey?: string;
  cacheTTL?: number;
  refetchInterval?: number;
  enabled?: boolean;
}

export function useOptimizedApi<T>(
  fetchFn: () => Promise<T>,
  options: UseOptimizedApiOptions = {}
) {
  const {
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutes
    refetchInterval,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<number | null>(null);

  const cache = useCache<T>({ ttl: cacheTTL });

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!enabled) return;

    const key = cacheKey || 'default';
    
    // Try to get from cache first
    if (!forceRefresh) {
      const cachedData = cache.get(key);
      if (cachedData) {
        setData(cachedData);
        setError(null);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      
      // Cache the result
      cache.set(key, result, cacheTTL);
      
      setData(result);
      setLastFetch(Date.now());
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, cacheKey, cacheTTL, enabled, cache]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch interval
  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    const interval = setInterval(() => {
      fetchData(true); // Force refresh
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [refetchInterval, enabled, fetchData]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  const clearCache = useCallback(() => {
    if (cacheKey) {
      cache.remove(cacheKey);
    }
  }, [cacheKey, cache]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    lastFetch,
  };
}

// Specific hooks for common API calls
export function useProduitsOptimized(options?: UseOptimizedApiOptions) {
  return useOptimizedApi(
    () => apiService.getProduitsStandards(),
    {
      cacheKey: 'produits',
      cacheTTL: 10 * 60 * 1000, // 10 minutes for products
      ...options,
    }
  );
}

export function useTraductionsOptimized(langue?: string, options?: UseOptimizedApiOptions) {
  return useOptimizedApi(
    () => apiService.getTraductions(langue),
    {
      cacheKey: `traductions_${langue || 'all'}`,
      cacheTTL: 30 * 60 * 1000, // 30 minutes for translations
      ...options,
    }
  );
}

export function useProduitOptimized(id: number, options?: UseOptimizedApiOptions) {
  return useOptimizedApi(
    () => apiService.getProduitStandard(id),
    {
      cacheKey: `produit_${id}`,
      cacheTTL: 15 * 60 * 1000, // 15 minutes for individual product
      ...options,
    }
  );
} 