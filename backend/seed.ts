import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Ajouter des produits standards
  const produits = [
    {
      titre: "Cuisine Vintage",
      description: "Cuisine élégante style vintage avec finitions soignées en bois massif",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Cuisine Velvety",
      description: "Cuisine moderne avec revêtement velours et design épuré",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Cuisine Eternal Shine",
      description: "Cuisine avec finitions brillantes et éclairage intégré",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Porte Chêne Intérieur",
      description: "Porte intérieure en chêne massif avec finitions naturelles",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Porte Pivot Extérieur",
      description: "Porte extérieure à pivot avec sécurité renforcée",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Dressing à la Française",
      description: "Dressing élégant style français avec placage noble",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Dressing Coulissant",
      description: "Dressing avec portes coulissantes pour gain d'espace",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Meuble TV",
      description: "Meuble TV moderne et fonctionnel avec rangement optimisé",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    },
    {
      titre: "Meuble Salle de Bain",
      description: "Meuble de salle de bain élégant et résistant à l'humidité",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      langues: ["fr", "en", "ar"]
    }
  ];

                for (const produit of produits) {
                // Vérifier si le produit existe déjà
                const existingProduit = await prisma.produitStandard.findFirst({
                  where: { titre: produit.titre }
                });

                if (existingProduit) {
                  // Mettre à jour le produit existant
                  await prisma.produitStandard.update({
                    where: { id: existingProduit.id },
                    data: produit,
                  });
                  console.log(`✅ Produit mis à jour: ${produit.titre}`);
                } else {
                  // Créer un nouveau produit
                  await prisma.produitStandard.create({
                    data: produit,
                  });
                  console.log(`✅ Produit créé: ${produit.titre}`);
                }
              }

  // Ajouter des traductions
  const traductions = [
    // Français
    { cle: "catalogue_title", valeur: "Catalogue", langue: "fr" },
    { cle: "catalogue_subtitle", valeur: "Découvrez notre collection complète", langue: "fr" },
    { cle: "cuisines_title", valeur: "Cuisines", langue: "fr" },
    { cle: "portes_title", valeur: "Portes", langue: "fr" },
    { cle: "dressing_title", valeur: "Dressing", langue: "fr" },
    { cle: "meubles_title", valeur: "Meubles", langue: "fr" },
    
    // Anglais
    { cle: "catalogue_title", valeur: "Catalog", langue: "en" },
    { cle: "catalogue_subtitle", valeur: "Discover our complete collection", langue: "en" },
    { cle: "cuisines_title", valeur: "Kitchens", langue: "en" },
    { cle: "portes_title", valeur: "Doors", langue: "en" },
    { cle: "dressing_title", valeur: "Dressing", langue: "en" },
    { cle: "meubles_title", valeur: "Furniture", langue: "en" },
    
    // Arabe
    { cle: "catalogue_title", valeur: "الكاتالوج", langue: "ar" },
    { cle: "catalogue_subtitle", valeur: "اكتشف مجموعتنا الكاملة", langue: "ar" },
    { cle: "cuisines_title", valeur: "المطابخ", langue: "ar" },
    { cle: "portes_title", valeur: "الأبواب", langue: "ar" },
    { cle: "dressing_title", valeur: "الخزائن", langue: "ar" },
    { cle: "meubles_title", valeur: "الأثاث", langue: "ar" }
  ];

                for (const traduction of traductions) {
                // Vérifier si la traduction existe déjà
                const existingTraduction = await prisma.traduction.findFirst({
                  where: {
                    cle: traduction.cle,
                    langue: traduction.langue
                  }
                });

                if (existingTraduction) {
                  // Mettre à jour la traduction existante
                  await prisma.traduction.update({
                    where: { id: existingTraduction.id },
                    data: traduction,
                  });
                  console.log(`✅ Traduction mise à jour: ${traduction.cle} (${traduction.langue})`);
                } else {
                  // Créer une nouvelle traduction
                  await prisma.traduction.create({
                    data: traduction,
                  });
                  console.log(`✅ Traduction créée: ${traduction.cle} (${traduction.langue})`);
                }
              }

  console.log('🎉 Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 