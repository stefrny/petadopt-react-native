import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';

import { PetProvider } from '@/contexts';
import { AuthProvider } from '@/contexts';
import { useAuth } from '@/hooks';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const isRouteProtected = segments[0] === '(tabs)' || segments[0] === 'pet';
    const isAuthRoute = segments[0] === 'login' || segments[0] === 'cadastro';

    if (!isAuthenticated && isRouteProtected) {
      // Se não estiver logado e tentar acessar o app principal
      router.replace('/login');
    } else if (isAuthenticated && isAuthRoute) {
      // Se estiver logado e tentar acessar login/cadastro
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="pet/create" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PetProvider>
        <ThemeProvider value={DefaultTheme}>
          <RootLayoutNav />
          <StatusBar style="auto" />
        </ThemeProvider>
      </PetProvider>
    </AuthProvider>
  );
}
