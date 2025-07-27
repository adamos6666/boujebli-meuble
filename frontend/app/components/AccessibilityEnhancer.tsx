
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
