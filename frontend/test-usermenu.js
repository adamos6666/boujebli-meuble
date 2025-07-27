// Script pour tester le UserMenu et diagnostiquer le problème
console.log('🧪 Test UserMenu - Démarrage...');

// Fonction pour vérifier l'état complet
function testUserMenu() {
  console.log('🔍 Vérification complète de l\'état d\'authentification...');
  
  // Vérifier localStorage
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  console.log('📊 localStorage:');
  console.log('- Token:', token ? `✅ (${token.length} caractères)` : '❌');
  console.log('- User:', userStr ? '✅' : '❌');
  
  if (userStr) {
    try {
      const userData = JSON.parse(userStr);
      console.log('👤 Données utilisateur:', userData);
      console.log('🎭 Rôle utilisateur:', userData.role);
    } catch (error) {
      console.error('❌ Erreur parsing user:', error);
    }
  }
  
  // Simuler le comportement du UserMenu
  if (token && userStr) {
    try {
      const userData = JSON.parse(userStr);
      console.log('✅ Données d\'authentification valides trouvées');
      console.log('🎯 État simulé du UserMenu:');
      console.log('- localUser:', userData);
      console.log('- localIsAuthenticated: true');
      console.log('- finalUser:', userData);
      console.log('- finalIsAuthenticated: true');
      console.log('- userRole:', userData.role);
      
      // Vérifier si le rôle est correct
      if (userData.role === 'client') {
        console.log('✅ Rôle "client" détecté - C\'est normal');
      } else {
        console.log('⚠️ Rôle inattendu:', userData.role);
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de la simulation:', error);
    }
  } else {
    console.log('❌ Données d\'authentification manquantes');
  }
}

// Exécuter le test
testUserMenu();

// Exporter pour utilisation dans la console
window.testUserMenu = testUserMenu; 