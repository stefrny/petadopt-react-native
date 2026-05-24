import { Pet, ApiResponse, RegisterUserPayload } from '@/types';

const API_URL = 'https://petadopt.onrender.com';

export async function getPets(): Promise<Pet[]> {
  const response = await fetch(`${API_URL}/pet/pets`);

  if (!response.ok) {
    throw new Error('Erro ao buscar pets');
  }
  const data: ApiResponse<Pet[]> = await response.json();
  return data.pets || [];
}

export async function registerUser(payload: RegisterUserPayload): Promise<void> {
  const response = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao cadastrar usuário');
  }
}
