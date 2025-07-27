const puppeteer = require('puppeteer');

async function testUserExperience() {
  console.log('🧪 Démarrage des tests d\'expérience utilisateur...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1280, height: 720 } 
  });
  
  try {
    const page = await browser.newPage();
    
    // Test 1: Page d'accueil
    console.log('1️⃣ Test de la page d\'accueil...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1', { timeout: 5000 });
    const title = await page.$eval('h1', el => el.textContent);
    console.log(`✅ Titre de la page d'accueil: ${title}`);
    
    // Test 2: Navigation vers le catalogue
    console.log('\n2️⃣ Test de la navigation vers le catalogue...');
    await page.click('a[href="/catalogue"]');
    await page.waitForSelector('.grid', { timeout: 5000 });
    const products = await page.$$('.grid > div');
    console.log(`✅ Nombre de produits affichés: ${products.length}`);
    
    // Test 3: Filtres du catalogue
    console.log('\n3️⃣ Test des filtres du catalogue...');
    
    // Test filtre "Tous"
    await page.click('button:has-text("Tous")');
    await page.waitForTimeout(1000);
    const allProducts = await page.$$('.grid > div');
    console.log(`✅ Filtre "Tous": ${allProducts.length} produits`);
    
    // Test filtre "Cuisines"
    await page.click('button:has-text("Cuisines")');
    await page.waitForTimeout(1000);
    const kitchenProducts = await page.$$('.grid > div');
    console.log(`✅ Filtre "Cuisines": ${kitchenProducts.length} produits`);
    
    // Test filtre "Portes"
    await page.click('button:has-text("Portes")');
    await page.waitForTimeout(1000);
    const doorProducts = await page.$$('.grid > div');
    console.log(`✅ Filtre "Portes": ${doorProducts.length} produits`);
    
    // Test filtre "Dressing"
    await page.click('button:has-text("Dressing")');
    await page.waitForTimeout(1000);
    const dressingProducts = await page.$$('.grid > div');
    console.log(`✅ Filtre "Dressing": ${dressingProducts.length} produits`);
    
    // Test filtre "Meubles"
    await page.click('button:has-text("Meubles")');
    await page.waitForTimeout(1000);
    const furnitureProducts = await page.$$('.grid > div');
    console.log(`✅ Filtre "Meubles": ${furnitureProducts.length} produits`);
    
    // Test 4: Pages de catégories individuelles
    console.log('\n4️⃣ Test des pages de catégories...');
    
    // Test page cuisines
    await page.goto('http://localhost:3000/produits/cuisines');
    await page.waitForSelector('.grid', { timeout: 5000 });
    const cuisinesProducts = await page.$$('.grid > div');
    console.log(`✅ Page cuisines: ${cuisinesProducts.length} produits`);
    
    // Test page portes
    await page.goto('http://localhost:3000/produits/portes');
    await page.waitForSelector('.grid', { timeout: 5000 });
    const portesProducts = await page.$$('.grid > div');
    console.log(`✅ Page portes: ${portesProducts.length} produits`);
    
    // Test page dressing
    await page.goto('http://localhost:3000/produits/dressing');
    await page.waitForSelector('.grid', { timeout: 5000 });
    const dressingPageProducts = await page.$$('.grid > div');
    console.log(`✅ Page dressing: ${dressingPageProducts.length} produits`);
    
    // Test page meubles
    await page.goto('http://localhost:3000/produits/meubles');
    await page.waitForSelector('.grid', { timeout: 5000 });
    const meublesProducts = await page.$$('.grid > div');
    console.log(`✅ Page meubles: ${meublesProducts.length} produits`);
    
    // Test 5: Changement de langue
    console.log('\n5️⃣ Test du changement de langue...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('[data-testid="language-switcher"]', { timeout: 5000 });
    
    // Test switch vers anglais
    await page.click('[data-testid="language-switcher"]');
    await page.waitForTimeout(1000);
    const englishTitle = await page.$eval('h1', el => el.textContent);
    console.log(`✅ Titre en anglais: ${englishTitle}`);
    
    // Test 6: Performance
    console.log('\n6️⃣ Test de performance...');
    const startTime = Date.now();
    await page.goto('http://localhost:3000/catalogue');
    await page.waitForSelector('.grid', { timeout: 5000 });
    const loadTime = Date.now() - startTime;
    console.log(`✅ Temps de chargement du catalogue: ${loadTime}ms`);
    
    // Test 7: Accessibilité
    console.log('\n7️⃣ Test d\'accessibilité...');
    const hasAltText = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.alt);
    });
    console.log(`✅ Images avec alt text: ${hasAltText}`);
    
    const hasHeadings = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return headings.length > 0;
    });
    console.log(`✅ Structure de titres: ${hasHeadings}`);
    
    console.log('\n🎉 Tests d\'expérience utilisateur terminés avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
  } finally {
    await browser.close();
  }
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  testUserExperience();
}

module.exports = { testUserExperience }; 