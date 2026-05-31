import { createContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { asyncStorage } from '@/storage';
import { loginUser, getUser } from '@/services';
import type { User, LoginPayload } from '@/types';

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (payload: LoginPayload) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [storedUser, storedToken] = await Promise.all([
        asyncStorage.getItem<User>('user'),
        asyncStorage.getItem('token'),
      ]);

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(payload: LoginPayload) {
    const loginResponse = await loginUser(payload);

    if (!loginResponse) {
      Alert.alert('Erro', 'E-mail ou senha inválidos');
      return;
    }

    const { user: { userId }, token } = loginResponse;

    const userData = await getUser(userId, token);
    if (!userData) return;

    setUser(userData);
    setToken(token);

    await Promise.all([
      asyncStorage.setItem('user', userData),
      asyncStorage.setItem('token', token),
    ]);

    router.replace('/(tabs)');
  }

  async function signOut() {
    await asyncStorage.removeMany(['user', 'token']);
    setUser(null);
    setToken(null);
    router.replace('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
