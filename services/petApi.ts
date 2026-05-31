import type {
  RegisterUserPayload,
  LoginPayload,
  LoginResponse,
  RegisterUserResponse,
  GetPetsFilters,
  GetPetByIdResponse,
  UserResponse,
  CreatePetPayload,
  GetPetsResponse,
  CreatePetResponse,
  GetCategoriesResponse,
} from '@/types';

const API_URL = 'https://petadopt.onrender.com';

export async function getUser(userId: string, token: string) {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  const data = await response.json() as UserResponse;
  return data.user;
}

export async function loginUser(payload: LoginPayload) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error('[loginUser] Error:', await response.text());
    return null;
  }

  return await response.json() as LoginResponse;
}

export async function registerUser(payload: RegisterUserPayload) {
  const response = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  return await response.json() as RegisterUserResponse;
}

export async function getPets(filters: GetPetsFilters = { page: 1 }) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    query.append(key, String(value));
  }

  const response = await fetch(`${API_URL}/pet/pets?${query}`);

  if (!response.ok) {
    console.log(await response.text());
    return { data: null, error: 'Failed to fetch pets' };
  }

  const data = await response.json() as GetPetsResponse;
  return { data: data.pets, error: null };
}

export async function getPetById(id: string, token: string) {
  const res = await fetch(`${API_URL}/pet/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.log(await res.text());
    return { data: null, error: 'Failed to fetch pet' };
  }

  const data = await res.json() as GetPetByIdResponse;
  return { data: data.pet, error: null };
}

/**
 * Cria um novo Pet.
 * @param petData Dados do Pet a ser criado.
 * @param token Token de autenticação do usuário.
 * @returns ID do novo Pet.
 */
export async function createPet(petData: CreatePetPayload, token: string) {
  const res = await fetch(`${API_URL}/pet/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });

  if (!res.ok) {
    console.log(await res.text());
    return { data: null, error: 'Failed to create pet' };
  }

  const data = await res.json() as CreatePetResponse;
  return { data: data.newPet._id, error: null };
}

export async function getCategories(token: string) {
  const res = await fetch(`${API_URL}/pet/category`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.log(await res.text());
    return { data: null, error: 'Failed to fetch categories' };
  }

  const data = await res.json() as GetCategoriesResponse;
  return { data: data.categories, error: null };
}
