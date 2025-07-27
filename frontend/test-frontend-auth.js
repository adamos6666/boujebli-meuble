// Test de l'authentification depuis le frontend
const API_BASE_URL = 'https://boujebli-meuble-backend.onrender.com';

async function testFrontendAuth() {
  console.log('🔐 Test de l\'authentification depuis le frontend...\n');

  try {
    // Test 1: Vérifier la connectivité
    console.log('1️⃣ Test de connectivité...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('✅ Santé API:', await healthResponse.json());
    console.log('');

    // Test 2: Test d'inscription
    console.log('2️⃣ Test d\'inscription...');
    const testUser = {
      name: 'Frontend Test User',
      email: `frontend${Date.now()}@example.com`,
      password: 'password123'
    };

    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });

    if (!registerResponse.ok) {
      const errorText = await registerResponse.text();
      console.log('❌ Erreur lors de l\'inscription:', registerResponse.status, errorText);
      return;
    }

    const registerData = await registerResponse.json();
    console.log('✅ Inscription réussie:', registerData);
    console.log('');

    // Test 3: Test de connexion
    console.log('3️⃣ Test de connexion...');
    const loginData = {
      email: testUser.email,
      password: testUser.password
    };

    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.log('❌ Erreur lors de la connexion:', loginResponse.status, errorText);
      return;
    }

    const loginResult = await loginResponse.json();
    console.log('✅ Connexion réussie:', loginResult);
    console.log('');

    console.log('🎉 Tous les tests frontend sont passés !');
    console.log('\n📋 Résumé:');
    console.log('   ✅ Connectivité OK');
    console.log('   ✅ Inscription OK');
    console.log('   ✅ Connexion OK');
    console.log('\n🔧 Le problème pourrait venir de:');
    console.log('   - CORS (Cross-Origin Resource Sharing)');
    console.log('   - Variables d\'environnement');
    console.log('   - Cache du navigateur');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('   1. Vérifier la connectivité internet');
    console.log('   2. Vérifier que le backend est accessible');
    console.log('   3. Vider le cache du navigateur');
    console.log('   4. Vérifier les variables d\'environnement');
  }
}

testFrontendAuth(); 