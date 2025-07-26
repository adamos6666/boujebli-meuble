// Exemple d'appel API depuis Next.js vers le backend NestJS

const API_BASE_URL = 'http://localhost:3000';

// Types pour les réponses API
interface ProduitStandard {
  id: number;
  titre: string;
  description: string;
  image?: string;
  langues: string[];
}

interface AuthResponse {
  access_token: string;
}

// Fonction pour récupérer les produits standards
export async function getProduitsStandards(langue?: string): Promise<ProduitStandard[]> {
  const url = langue 
    ? `${API_BASE_URL}/produit-standard?langue=${langue}`
    : `${API_BASE_URL}/produit-standard`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }
  return response.json();
}

// Fonction pour créer un produit standard (nécessite un token JWT)
export async function createProduitStandard(data: {
  titre: string;
  description: string;
  image?: string;
  langues: string[];
}, token: string): Promise<ProduitStandard> {
  const response = await fetch(`${API_BASE_URL}/produit-standard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la création du produit');
  }
  return response.json();
}

// Fonction pour se connecter
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Identifiants invalides');
  }
  return response.json();
}

// Fonction pour s'inscrire
export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de l\'inscription');
  }
  return response.json();
}

// Hook personnalisé pour gérer l'authentification côté frontend
export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const loginUser = async (email: string, password: string) => {
    try {
      const authResponse = await login(email, password);
      setToken(authResponse.access_token);
      // Stocker le token dans localStorage
      localStorage.setItem('token', authResponse.access_token);
      return authResponse;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // Charger le token depuis localStorage au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return { token, user, loginUser, logout };
} 