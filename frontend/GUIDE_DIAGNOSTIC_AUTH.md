# Guide de Diagnostic - Problème d'Authentification

## 🚨 Problème Identifié

Vous avez une erreur "Internal server error" dans `lib/api.ts` ligne 71, et aucun signe de connexion n'est affiché.

## 🔍 Diagnostic Effectué

### ✅ Tests Réussis
- **Backend API** : Fonctionne parfaitement (tests Node.js OK)
- **Connectivité** : L'API est accessible depuis le serveur
- **Authentification** : Inscription et connexion fonctionnent

### ❌ Problème Identifié
Le problème vient du **frontend** qui ne peut pas se connecter au backend depuis le navigateur.

## 🛠️ Solutions à Tester

### 1. Test Rapide avec Page HTML
Ouvrez le fichier `test-browser-auth.html` dans votre navigateur :
```bash
# Ouvrir le fichier dans le navigateur
file:///C:/Users/youss/Desktop/baoujebli%20meuble/frontend/test-browser-auth.html
```

### 2. Vérifier le Frontend
Assurez-vous que le frontend démarre correctement :
```bash
cd frontend
npm run dev
```

### 3. Vider le Cache du Navigateur
- **Chrome** : Ctrl+Shift+R (rechargement forcé)
- **Firefox** : Ctrl+F5
- **Edge** : Ctrl+Shift+R

### 4. Vérifier la Console du Navigateur
1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Console"
3. Regardez les erreurs CORS ou réseau

### 5. Test Direct de l'API
Dans la console du navigateur, testez :
```javascript
fetch('https://boujebli-meuble-backend.onrender.com/health')
  .then(response => response.json())
  .then(data => console.log('✅ API OK:', data))
  .catch(error => console.error('❌ Erreur:', error));
```

## 🔧 Corrections Possibles

### Problème 1: CORS
Si vous voyez une erreur CORS, le backend doit être redéployé avec la nouvelle configuration.

### Problème 2: Variables d'Environnement
Vérifiez que le frontend utilise la bonne URL :
```javascript
// Dans frontend/app/services/api.ts
const API_BASE_URL = 'https://boujebli-meuble-backend.onrender.com';
```

### Problème 3: Cache du Navigateur
Le navigateur peut avoir mis en cache une ancienne version.

### Problème 4: Réseau
Vérifiez votre connexion internet et les pare-feu.

## 📋 Checklist de Diagnostic

- [ ] **Frontend démarre** : `npm run dev` fonctionne
- [ ] **Page HTML de test** : `test-browser-auth.html` fonctionne
- [ ] **Console navigateur** : Pas d'erreurs CORS
- [ ] **Cache vidé** : Rechargement forcé effectué
- [ ] **API accessible** : Test direct dans la console OK

## 🚀 Étapes de Résolution

### Étape 1: Test Rapide
1. Ouvrez `test-browser-auth.html` dans le navigateur
2. Cliquez sur "Test Santé API"
3. Si ça fonctionne, le problème vient du frontend Next.js

### Étape 2: Diagnostic Frontend
1. Démarrez le frontend : `npm run dev`
2. Ouvrez `http://localhost:3000`
3. Ouvrez la console (F12)
4. Allez sur `/login` ou `/register`
5. Regardez les erreurs dans la console

### Étape 3: Correction
Selon l'erreur trouvée :
- **CORS** → Redéployer le backend
- **Cache** → Vider le cache du navigateur
- **Réseau** → Vérifier la connectivité
- **Code** → Corriger le code frontend

## 📞 Support

Si le problème persiste, fournissez :
1. **Erreurs de la console** du navigateur
2. **Résultat du test HTML**
3. **URL exacte** où l'erreur se produit
4. **Navigateur utilisé** et version

---

**Status** : 🔍 **EN COURS DE DIAGNOSTIC** - Suivez les étapes ci-dessus pour identifier la cause exacte. 