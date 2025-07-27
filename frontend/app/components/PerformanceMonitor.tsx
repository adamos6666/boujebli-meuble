
"use client";
import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Mesurer les Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Envoyer les métriques à votre service d'analytics
        if (lastEntry.startTime > 2500) {
          console.warn('LCP trop lent:', lastEntry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (entry.processingStart - entry.startTime > 100) {
            console.warn('FID trop lent:', entry.processingStart - entry.startTime);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
        
        if (clsValue > 0.1) {
          console.warn('CLS trop élevé:', clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Mesurer le temps de chargement de la page
    const pageLoadTime = performance.now();
    console.log('Temps de chargement de la page:', pageLoadTime);

    // Mesurer la taille du bundle
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.log('Taille du transfert:', navigation.transferSize);
        console.log('Taille de la ressource:', navigation.encodedBodySize);
      }
    }
  }, []);

  return null;
}
