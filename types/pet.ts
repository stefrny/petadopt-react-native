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

