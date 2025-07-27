// Script pour forcer le rechargement de l'authentification
console.log('🚀 Force Auth Reload - Démarrage...');

// Fonction pour forcer le rechargement de l'authentification
function forceAuthReload() {
  console.log('🔍 Vérification localStorage...');
  
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  console.log('📊 État localStorage:');
  console.log('- Token:', token ? `✅ (${token.length} caractères)` : '❌');
  console.log('- User:', user ? '✅' : '❌');
  
  if (user) {
    try {
      const userData = JSON.parse(user);
      console.log('👤 Données utilisateur:', userData);
    } catch (error) {
      console.error('❌ Erreur parsing user:', error);
    }
  }
  
  if (token && user) {
    console.log('✅ Données d\'authentification trouvées, rechargement de la page...');
    
    // Attendre 2 secondes puis recharger
    setTimeout(() => {
      console.log('🔄 Rechargement de la page...');
      window.location.reload();
    }, 2000);
  } else {
    console.log('❌ Données d\'authentification manquantes');
  }
}

// Exécuter immédiatement
forceAuthReload();

// Exporter pour utilisation dans la console
window.forceAuthReload = forceAuthReload; 