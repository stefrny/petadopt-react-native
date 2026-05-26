/**
 * Representa um Usuário no sistema.
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload para cadastro de um novo usuário.
 */
export interface RegisterUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmpassword: string;
}

/**
 * Resposta de cadastro de usuário.
 */
export interface RegisterUserResponse {
  message: string;
  token: string;
  userId: string;
  isAdmin: boolean;
}

/**
 * Payload para login.
 */
export interface LoginPayload {
  email: string;
  password?: string;
}

/**
 * Resposta de login da API.
 */
export type LoginResponse = RegisterUserResponse;
