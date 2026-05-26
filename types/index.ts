export * from './auth';
export * from './pet';

/**
 * Respostas genéricas da API.
 */
export interface ApiResponse<T> {
  message?: string;
  pets?: T; // A API atual retorna { pets: [...] }
  user?: T; // Para respostas de login/perfil
}
