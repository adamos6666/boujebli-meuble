// Script pour tester le chargement immédiat de l'authentification
console.log('🚀 Test de chargement immédiat de l\'authentification...');

// Fonction pour vérifier l'état actuel
function checkAuthState() {
  console.log('🔍 Vérification de l\'état d\'authentification...');
  
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
  
  // Vérifier si les données sont valides
  if (token && user) {
    console.log('✅ Données d\'authentification valides trouvées');
    console.log('🔄 Rechargement de la page pour tester le hook...');
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    console.log('❌ Données d\'authentification manquantes ou invalides');
  }
}

// Exécuter immédiatement
checkAuthState();

// Exporter pour utilisation dans la console
window.checkAuthState = checkAuthState; 