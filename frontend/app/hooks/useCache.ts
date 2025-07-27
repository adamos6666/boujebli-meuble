"use client";
import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheOptions {
  ttl?: number; // Default TTL in milliseconds (5 minutes)
  maxSize?: number; // Maximum number of items in cache
}

export function useCache<T>(options: CacheOptions = {}) {
  const { ttl = 5 * 60 * 1000, maxSize = 100 } = options;
  const [cache, setCache] = useState<Map<string, CacheItem<T>>>(new Map());

  // Cleanup expired items
  const cleanup = useCallback(() => {
    const now = Date.now();
    setCache(prevCache => {
      const newCache = new Map();
      for (const [key, item] of prevCache.entries()) {
        if (now - item.timestamp < item.ttl) {
          newCache.set(key, item);
        }
      }
      return newCache;
    });
  }, []);

  // Get item from cache
  const get = useCallback((key: string): T | null => {
    const item = cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      cache.delete(key);
      return null;
    }

    return item.data;
  }, [cache]);

  // Set item in cache
  const set = useCallback((key: string, data: T, customTtl?: number) => {
    const now = Date.now();
    const itemTtl = customTtl || ttl;

    setCache(prevCache => {
      const newCache = new Map(prevCache);
      
      // Remove oldest items if cache is full
      if (newCache.size >= maxSize) {
        const oldestKey = newCache.keys().next().value;
        newCache.delete(oldestKey);
      }

      newCache.set(key, {
        data,
        timestamp: now,
        ttl: itemTtl,
      });

      return newCache;
    });
  }, [ttl, maxSize]);

  // Remove item from cache
  const remove = useCallback((key: string) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.delete(key);
      return newCache;
    });
  }, []);

  // Clear all cache
  const clear = useCallback(() => {
    setCache(new Map());
  }, []);

  // Get cache stats
  const getStats = useCallback(() => {
    const now = Date.now();
    let validItems = 0;
    let expiredItems = 0;

    for (const item of cache.values()) {
      if (now - item.timestamp < item.ttl) {
        validItems++;
      } else {
        expiredItems++;
      }
    }

    return {
      total: cache.size,
      valid: validItems,
      expired: expiredItems,
    };
  }, [cache]);

  // Cleanup on mount and every minute
  useEffect(() => {
    cleanup();
    const interval = setInterval(cleanup, 60000); // Cleanup every minute
    return () => clearInterval(interval);
  }, [cleanup]);

  return {
    get,
    set,
    remove,
    clear,
    getStats,
  };
} 