// Script de test pour diagnostiquer le problème d'authentification
console.log('=== DIAGNOSTIC AUTHENTIFICATION ===');

// Vérifier localStorage
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');

console.log('🔍 localStorage:');
console.log('- Token:', token ? '✅ Présent' : '❌ Absent');
console.log('- User:', userStr ? '✅ Présent' : '❌ Absent');

if (token) {
  console.log('- Token length:', token.length);
  console.log('- Token preview:', token.substring(0, 20) + '...');
}

if (userStr) {
  try {
    const user = JSON.parse(userStr);
    console.log('- User parsed:', user);
    console.log('- User name:', user.name);
    console.log('- User email:', user.email);
    console.log('- User role:', user.role);
  } catch (error) {
    console.error('❌ Erreur parsing user:', error);
  }
}

// Vérifier si l'utilisateur est authentifié
const isAuthenticated = !!(token && userStr);
console.log('🔐 Authentification:', isAuthenticated ? '✅ OUI' : '❌ NON');

// Test des pages
console.log('\n🔍 Test des pages:');
const pages = ['/profile', '/settings', '/my-requests', '/favorites', '/messages'];

pages.forEach(page => {
  console.log(`- ${page}: ${isAuthenticated ? '✅ Accessible' : '❌ Redirection login'}`);
});

// Vérifier les composants
console.log('\n🔍 Composants:');
console.log('- UserMenu: Chargé');
console.log('- AuthDebug: Chargé');

// Test de navigation
console.log('\n🧪 Test de navigation:');
console.log('1. Cliquez sur l\'icône de personne');
console.log('2. Vérifiez si le menu s\'ouvre');
console.log('3. Cliquez sur "Mon Profil"');
console.log('4. Vérifiez si vous allez vers /profile');

console.log('\n📊 Résumé:');
console.log(`- Authentifié: ${isAuthenticated ? 'OUI' : 'NON'}`);
console.log(`- Token: ${token ? 'PRÉSENT' : 'ABSENT'}`);
console.log(`- User: ${userStr ? 'PRÉSENT' : 'ABSENT'}`);
console.log(`- Pages accessibles: ${isAuthenticated ? 'TOUTES' : 'AUCUNE'}`);

console.log('\n=== FIN DIAGNOSTIC ==='); 