const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage des optimisations...\n');

// 1. Optimisations SEO
console.log('1️⃣ Optimisations SEO...');

// Ajouter les métadonnées dans layout.tsx
const layoutPath = path.join(__dirname, 'app', 'layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Vérifier si les métadonnées sont déjà présentes
if (!layoutContent.includes('export const metadata')) {
  const metadataSection = `
export const metadata = {
  title: {
    default: 'Boujebli Meuble - Fabricant de Meubles sur Mesure',
    template: '%s | Boujebli Meuble'
  },
  description: 'Fabricant de meubles sur mesure en bois MDF. Cuisines, portes, dressing et meubles personnalisés. Qualité française, design moderne.',
  keywords: ['meubles sur mesure', 'cuisine', 'porte', 'dressing', 'bois MDF', 'fabricant français'],
  authors: [{ name: 'Boujebli Meuble' }],
  creator: 'Boujebli Meuble',
  publisher: 'Boujebli Meuble',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://boujebli-meuble.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Boujebli Meuble - Fabricant de Meubles sur Mesure',
    description: 'Fabricant de meubles sur mesure en bois MDF. Cuisines, portes, dressing et meubles personnalisés.',
    url: 'https://boujebli-meuble.vercel.app',
    siteName: 'Boujebli Meuble',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Boujebli Meuble - Fabricant de Meubles sur Mesure',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boujebli Meuble - Fabricant de Meubles sur Mesure',
    description: 'Fabricant de meubles sur mesure en bois MDF. Cuisines, portes, dressing et meubles personnalisés.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};
`;

  // Insérer les métadonnées après les imports
  const importEndIndex = layoutContent.lastIndexOf('import');
  const importEndLine = layoutContent.indexOf('\n', importEndIndex) + 1;
  
  layoutContent = layoutContent.slice(0, importEndLine) + metadataSection + layoutContent.slice(importEndLine);
  
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Métadonnées SEO ajoutées au layout');
} else {
  console.log('✅ Métadonnées SEO déjà présentes');
}

// 2. Optimisations de performance
console.log('\n2️⃣ Optimisations de performance...');

// Créer un fichier de configuration pour les images optimisées
const imageConfig = `
// Configuration des images optimisées
export const imageConfig = {
  domains: ['images.pexels.com', 'images.unsplash.com'],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
};
`;

const imageConfigPath = path.join(__dirname, 'app', 'config', 'images.ts');
if (!fs.existsSync(path.dirname(imageConfigPath))) {
  fs.mkdirSync(path.dirname(imageConfigPath), { recursive: true });
}
fs.writeFileSync(imageConfigPath, imageConfig);
console.log('✅ Configuration des images optimisées créée');

// 3. Optimisations d'accessibilité
console.log('\n3️⃣ Optimisations d\'accessibilité...');

// Créer un composant d'accessibilité
const accessibilityComponent = `
"use client";
import { useEffect } from 'react';

export function AccessibilityEnhancer() {
  useEffect(() => {
    // Améliorer la navigation au clavier
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content
      if (event.key === 'Tab' && event.altKey) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.focus();
        }
      }
    };

    // Ajouter des attributs ARIA manquants
    const addAriaAttributes = () => {
      // Ajouter role="main" au contenu principal
      const mainContent = document.querySelector('main');
      if (mainContent && !mainContent.getAttribute('role')) {
        mainContent.setAttribute('role', 'main');
      }

      // Ajouter aria-label aux boutons sans texte
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
          const icon = button.querySelector('svg');
          if (icon) {
            button.setAttribute('aria-label', 'Action button');
          }
        }
      });

      // Ajouter aria-expanded aux dropdowns
      const dropdowns = document.querySelectorAll('[data-testid="language-switcher"]');
      dropdowns.forEach(dropdown => {
        const isOpen = dropdown.classList.contains('open');
        dropdown.setAttribute('aria-expanded', isOpen.toString());
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    addAriaAttributes();

    // Observer les changements du DOM pour maintenir l'accessibilité
    const observer = new MutationObserver(addAriaAttributes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  return null;
}
`;

const accessibilityPath = path.join(__dirname, 'app', 'components', 'AccessibilityEnhancer.tsx');
fs.writeFileSync(accessibilityPath, accessibilityComponent);
console.log('✅ Composant d\'accessibilité créé');

// 4. Optimisations de sécurité
console.log('\n4️⃣ Optimisations de sécurité...');

// Créer un fichier de configuration de sécurité
const securityConfig = `
// Configuration de sécurité
export const securityConfig = {
  // Headers de sécurité
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  },
  
  // Configuration CORS
  cors: {
    origin: [
      'http://localhost:3000',
      'https://boujebli-meuble.vercel.app',
      'https://boujebli-meuble-frontend.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
};
`;

const securityPath = path.join(__dirname, 'app', 'config', 'security.ts');
fs.writeFileSync(securityPath, securityConfig);
console.log('✅ Configuration de sécurité créée');

// 5. Optimisations de cache
console.log('\n5️⃣ Optimisations de cache...');

// Créer un service worker pour le cache
const serviceWorker = `
// Service Worker pour le cache
const CACHE_NAME = 'boujebli-meuble-v1';
const urlsToCache = [
  '/',
  '/catalogue',
  '/produits/cuisines',
  '/produits/portes',
  '/produits/dressing',
  '/produits/meubles',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la réponse en cache ou faire la requête réseau
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;

const swPath = path.join(__dirname, 'public', 'sw.js');
fs.writeFileSync(swPath, serviceWorker);
console.log('✅ Service Worker créé');

// 6. Optimisations de monitoring
console.log('\n6️⃣ Optimisations de monitoring...');

// Créer un composant de monitoring des performances
const performanceMonitor = `
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
`;

const monitorPath = path.join(__dirname, 'app', 'components', 'PerformanceMonitor.tsx');
fs.writeFileSync(monitorPath, performanceMonitor);
console.log('✅ Composant de monitoring créé');

console.log('\n🎉 Toutes les optimisations ont été appliquées avec succès!');
console.log('\n📋 Résumé des optimisations:');
console.log('✅ SEO: Métadonnées, Open Graph, Twitter Cards');
console.log('✅ Performance: Images optimisées, Service Worker');
console.log('✅ Accessibilité: Attributs ARIA, Navigation clavier');
console.log('✅ Sécurité: Headers de sécurité, CSP');
console.log('✅ Cache: Service Worker, Stratégies de cache');
console.log('✅ Monitoring: Core Web Vitals, Métriques de performance');

console.log('\n🚀 Prochaines étapes:');
console.log('1. Tester l\'application avec les nouvelles optimisations');
console.log('2. Vérifier les métriques de performance');
console.log('3. Tester l\'accessibilité avec des outils automatisés');
console.log('4. Déployer et surveiller les performances en production'); 