// Script de test pour l'authentification
const API_BASE = 'http://localhost:3001';

async function testAuth() {
  console.log('🧪 Test d\'authentification...');
  
  try {
    // Test de connexion
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'adam.karoui51@gmail.com',
        password: '11112022Ad'
      })
    });
    
    console.log('📡 Statut de connexion:', loginResponse.status);
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Connexion réussie:', loginData);
      
      // Test du profil
      const token = loginData.access_token || loginData.data?.access_token;
      if (token) {
        const profileResponse = await fetch(`${API_BASE}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        console.log('📡 Statut du profil:', profileResponse.status);
        
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log('✅ Profil récupéré:', profileData);
        } else {
          const errorData = await profileResponse.json();
          console.error('❌ Erreur profil:', errorData);
        }
      }
    } else {
      const errorData = await loginResponse.json();
      console.error('❌ Erreur de connexion:', errorData);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Exécuter le test
testAuth(); 