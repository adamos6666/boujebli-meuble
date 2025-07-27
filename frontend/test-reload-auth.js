// Script pour tester le rechargement de l'authentification
console.log('🧪 Test de rechargement de l\'authentification...');

// Vérifier localStorage
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

console.log('🔍 localStorage actuel:');
console.log('Token:', token ? '✅ Présent' : '❌ Absent');
console.log('User:', user ? '✅ Présent' : '❌ Absent');

if (user) {
  try {
    const userData = JSON.parse(user);
    console.log('👤 Données utilisateur:', userData);
  } catch (error) {
    console.error('❌ Erreur parsing user:', error);
  }
}

// Forcer le rechargement de la page
console.log('🔄 Rechargement de la page dans 3 secondes...');
setTimeout(() => {
  window.location.reload();
}, 3000); 