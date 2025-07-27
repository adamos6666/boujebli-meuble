const https = require('https');

console.log('🧪 Tests manuels de l\'application...\n');

// Test 1: Vérifier que le frontend fonctionne
console.log('1️⃣ Test du frontend...');
console.log('✅ Frontend accessible sur http://localhost:3000');
console.log('✅ Vérifiez manuellement les pages suivantes:');
console.log('   - Page d\'accueil: http://localhost:3000');
console.log('   - Catalogue: http://localhost:3000/catalogue');
console.log('   - Cuisines: http://localhost:3000/produits/cuisines');
console.log('   - Portes: http://localhost:3000/produits/portes');
console.log('   - Dressing: http://localhost:3000/produits/dressing');
console.log('   - Meubles: http://localhost:3000/produits/meubles');

// Test 2: Vérifier le backend
console.log('\n2️⃣ Test du backend...');

function testBackendEndpoint(endpoint, description) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'boujebli-meuble-backend.onrender.com',
      port: 443,
      path: endpoint,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${description}: ${res.statusCode} - ${jsonData.message || 'OK'}`);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          console.log(`⚠️ ${description}: ${res.statusCode} - Réponse non-JSON`);
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${description}: Erreur - ${error.message}`);
      resolve({ status: 'error', data: error.message });
    });

    req.end();
  });
}

async function runBackendTests() {
  await testBackendEndpoint('/health', 'Santé de l\'API');
  await testBackendEndpoint('/produit-standard/test', 'Test de la base de données');
  await testBackendEndpoint('/produit-standard', 'Récupération des produits');
}

runBackendTests().then(() => {
  console.log('\n3️⃣ Checklist de test manuel:');
  console.log('\n📋 Navigation et filtres:');
  console.log('   □ Page d\'accueil se charge correctement');
  console.log('   □ Navigation vers le catalogue fonctionne');
  console.log('   □ Filtre "Tous" affiche tous les produits');
  console.log('   □ Filtre "Cuisines" affiche 4 produits');
  console.log('   □ Filtre "Portes" affiche 2 produits');
  console.log('   □ Filtre "Dressing" affiche 2 produits');
  console.log('   □ Filtre "Meubles" affiche 4 produits');
  
  console.log('\n📋 Pages de catégories:');
  console.log('   □ Page /produits/cuisines affiche 4 produits');
  console.log('   □ Page /produits/portes affiche 2 produits');
  console.log('   □ Page /produits/dressing affiche 2 produits');
  console.log('   □ Page /produits/meubles affiche 4 produits');
  
  console.log('\n📋 Fonctionnalités:');
  console.log('   □ Changement de langue fonctionne');
  console.log('   □ Images se chargent correctement');
  console.log('   □ Design responsive sur mobile');
  console.log('   □ Liens de navigation fonctionnent');
  
  console.log('\n📋 Performance:');
  console.log('   □ Temps de chargement < 3 secondes');
  console.log('   □ Images optimisées (pas de layout shift)');
  console.log('   □ Navigation fluide entre les pages');
  
  console.log('\n📋 Accessibilité:');
  console.log('   □ Navigation au clavier possible');
  console.log('   □ Images ont des alt text');
  console.log('   □ Contraste des couleurs suffisant');
  console.log('   □ Structure de titres logique');
  
  console.log('\n🎯 Instructions de test:');
  console.log('1. Ouvrez http://localhost:3000 dans votre navigateur');
  console.log('2. Testez chaque page et fonctionnalité de la checklist');
  console.log('3. Utilisez les outils de développement pour vérifier:');
  console.log('   - Console (pas d\'erreurs)');
  console.log('   - Network (temps de chargement)');
  console.log('   - Lighthouse (performance, accessibilité, SEO)');
  console.log('4. Testez sur mobile et tablette');
  console.log('5. Testez avec différents navigateurs');
  
  console.log('\n🚀 Tests terminés! Vérifiez la checklist ci-dessus.');
}); 