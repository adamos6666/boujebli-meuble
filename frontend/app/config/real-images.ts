// Vraies images de meubles depuis Pexels
// Images de haute qualité pour un rendu professionnel

export const realProductImages = {
  cuisines: [
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  ],
  portes: [
    "https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  ],
  dressing: [
    "https://images.pexels.com/photos/1571466/pexels-photo-1571466.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  ],
  meubles: [
    "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  ]
};

// Images de fallback par catégorie
export const fallbackImages = {
  cuisine: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  porte: "https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  dressing: "https://images.pexels.com/photos/1571466/pexels-photo-1571466.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  meuble: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  default: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
};

// Fonction pour obtenir une image selon la catégorie et l'ID du produit
export function getRealProductImage(category: string, productId: number): string {
  const categoryImages = realProductImages[category as keyof typeof realProductImages];
  
  if (!categoryImages || categoryImages.length === 0) {
    return fallbackImages[category as keyof typeof fallbackImages] || fallbackImages.default;
  }

  const imageIndex = productId % categoryImages.length;
  return categoryImages[imageIndex];
}

// Fonction pour obtenir une image de fallback selon la catégorie
export function getFallbackImage(category: string): string {
  return fallbackImages[category as keyof typeof fallbackImages] || fallbackImages.default;
} 