import type {
  User,
  RegisterUserPayload,
  LoginPayload,
  LoginResponse,
  RegisterUserResponse,
  Pet,
  ApiResponse,
} from '@/types';

const API_URL = 'https://petadopt.onrender.com';

export async function getUser(userId: string) {
  const response = await fetch(`${API_URL}/user/${userId}`);

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  return await response.json() as User;
}

export async function loginUser(payload: LoginPayload) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.log(await response.text());
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

export async function getPets() {
  const response = await fetch(`${API_URL}/pet/pets`);

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  const data: ApiResponse<Pet[]> = await response.json();
  return data.pets || [];
}

