/**
 * Representa um Pet no sistema.
 */
export interface Pet {
  _id: string;
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
  available: boolean;
  user: {
    _id: string;
    name: string;
    phone: string;
    image?: string;
  };
  adopter?: string | null;
  createdAt: string;
  updatedAt: string;
  gender: 'Macho' | 'Fêmea'; // Inferido do uso comum em apps de adoção
}

/**
 * Payload para criação de um novo Pet.
 */
export interface CreatePetPayload {
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
}

/**
 * Representa um Usuário no sistema.
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  token?: string;
}

/**
 * Payload para criação de um novo usuário.
 */
export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmpassword: string;
}

/**
 * Respostas genéricas da API.
 */
export interface ApiResponse<T> {
  message?: string;
  pets?: T; // A API atual retorna { pets: [...] }
  user?: T; // Para respostas de login/perfil
}
