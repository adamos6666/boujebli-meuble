const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ProduitStandard {
  id: number;
  titre: string;
  description: string;
  image: string | null;
  langues: string[];
}

export interface DemandeSurMesure {
  id: number;
  nom: string;
  dimensions: string;
  image: string | null;
  clientId: number;
}

export interface Traduction {
  id: number;
  cle: string;
  valeur: string;
  langue: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('🌐 Tentative de connexion à:', url);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Erreur API:', error);
      console.error('URL tentée:', url);
      throw error;
    }
  }

  // Produits Standards
  async getProduitsStandards(langue?: string): Promise<ProduitStandard[]> {
    const params = langue ? `?langue=${langue}` : '';
    return this.request<ProduitStandard[]>(`/produit-standard${params}`);
  }

  async getProduitStandard(id: number): Promise<ProduitStandard> {
    return this.request<ProduitStandard>(`/produit-standard/${id}`);
  }

  async createProduitStandard(data: Omit<ProduitStandard, 'id'>): Promise<ProduitStandard> {
    return this.request<ProduitStandard>('/produit-standard', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduitStandard(id: number, data: Partial<ProduitStandard>): Promise<ProduitStandard> {
    return this.request<ProduitStandard>(`/produit-standard/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteProduitStandard(id: number): Promise<ProduitStandard> {
    return this.request<ProduitStandard>(`/produit-standard/${id}`, {
      method: 'DELETE',
    });
  }

  // Demandes sur Mesure
  async getDemandesSurMesure(): Promise<DemandeSurMesure[]> {
    return this.request<DemandeSurMesure[]>('/demande-sur-mesure');
  }

  async getDemandeSurMesure(id: number): Promise<DemandeSurMesure> {
    return this.request<DemandeSurMesure>(`/demande-sur-mesure/${id}`);
  }

  async createDemandeSurMesure(data: Omit<DemandeSurMesure, 'id'>): Promise<DemandeSurMesure> {
    return this.request<DemandeSurMesure>('/demande-sur-mesure', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Traductions
  async getTraductions(langue?: string): Promise<Traduction[]> {
    const params = langue ? `?langue=${langue}` : '';
    return this.request<Traduction[]>(`/traduction${params}`);
  }

  async getTraduction(id: number): Promise<Traduction> {
    return this.request<Traduction>(`/traduction/${id}`);
  }

  // Auth
  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    return this.request<{ access_token: string; refresh_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string): Promise<User> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    return this.request<{ access_token: string; refresh_token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/user');
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/user/${id}`);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.request<User>(`/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.request<User>(`/user/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(); 