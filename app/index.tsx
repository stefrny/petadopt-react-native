import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

export default function Index() {
  const [logado, setLogado] = useState<boolean | null>(null);

  useEffect(() => {
    verificarLogin();
  }, []);

  const verificarLogin = async () => {
    const usuarioLogado = await AsyncStorage.getItem('logado');
    setLogado(usuarioLogado === 'true');
  };

  if (logado === null) {
    return null;
  }

  if (logado) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
