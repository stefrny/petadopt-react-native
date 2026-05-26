import { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { User, LoginPayload } from '@/types';
import { loginUser, getUser } from '@/services/petService';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (payload: LoginPayload) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem('@PetAdopt:user'),
          AsyncStorage.getItem('@PetAdopt:token'),
        ]);

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Erro ao carregar dados de auth', e);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(payload: LoginPayload) {
    try {
      const response = await loginUser(payload);
      
      if (!response) {
        throw new Error('E-mail ou senha inválidos');
      }

      const { userId, token } = response;
      
      // Busca os dados completos do usuário
      const userData = await getUser(userId);

      if (!userData) {
        throw new Error('Erro ao recuperar dados do usuário');
      }

      setUser(userData);

      await Promise.all([
        AsyncStorage.setItem('@PetAdopt:user', JSON.stringify(userData)),
        AsyncStorage.setItem('@PetAdopt:token', token),
      ]);

      router.replace('/(tabs)');
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove(['@PetAdopt:user', '@PetAdopt:token']);
    setUser(null);
    router.replace('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
