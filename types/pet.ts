import { Prettify } from "./utils";

type PetGender = "male" | "female";

/**
 * Representa um Pet no sistema.
 */
export interface Pet {
  _id: string;
  name: string;
  age: number;
  breed: string;
  weight: number;
  gender: PetGender;
  color: string;
  story: string;
  available: boolean;
  images: string[];
  adopter?: string | null;
  user: {
    _id: string;
    name: string;
    phone: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Filtros para busca de Pets.
 */
export interface GetPetsFilters {
  page?: number;
  limit?: number;
}

/**
 * Resposta de GET /pet/pets.
 */
export interface GetPetsResponse {
  pets: Pet[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Resposta de GET /pet/:id.
 */
export interface GetPetByIdResponse {
  pet: Pet;
}

/**
 * Payload para criação de um novo Pet.
 */
export type CreatePetPayload = Prettify<
  Omit<Pet, "_id" | "user" | "adopter" | "createdAt" | "updatedAt"> & {
    category: string;
  }
>;

/**
 * Resposta de POST /pet/create.
 */
export interface CreatePetResponse {
  message: string;
  newPet: Pet;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}

/**
 * Resposta de GET /pet/category.
 */
export interface GetCategoriesResponse {
  categories: Category[];
}
