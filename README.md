# Boujebli Meuble

Site web pour l'entreprise Boujebli Meuble - Fabrication de meubles sur mesure.

## 🏗️ Architecture

- **Frontend** : Next.js avec TypeScript, TailwindCSS, next-i18next
- **Backend** : NestJS avec TypeScript, Prisma ORM, PostgreSQL
- **Authentification** : JWT avec refresh tokens
- **Multilingue** : Français, Anglais, Arabe (avec support RTL)

## 📁 Structure du projet

```
baoujebli meuble/
├── frontend/          # Application Next.js
├── backend/           # API NestJS
└── README.md
```

## 🚀 Installation

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run start:dev
```

## 🌐 Déploiement

- **Frontend** : Vercel
- **Backend** : Railway/Render
- **Base de données** : PostgreSQL (Railway/Supabase)

## 📝 Fonctionnalités

- Page d'accueil multilingue
- Catalogue de produits standards
- Demandes de meubles sur mesure
- Espace client avec authentification
- Panel administrateur
- Support RTL pour l'arabe 