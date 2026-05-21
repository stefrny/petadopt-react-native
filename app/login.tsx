import { useState } from 'react';


import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {

    try {

      const usuarioSalvo =
        await AsyncStorage.getItem('usuario');

      if (!usuarioSalvo) {

        Alert.alert(
          'Erro',
          'Nenhum usuário cadastrado'
        );

        return;
      }

      const usuario = JSON.parse(usuarioSalvo);

      if (
        usuario.email === email &&
        usuario.senha === senha
      ) {

        await AsyncStorage.setItem(
          'logado',
          'true'
        );

        Alert.alert(
          'Sucesso',
          'Login realizado'
        );

        router.replace('/(tabs)');

      } else {

        Alert.alert(
          'Erro',
          'E-mail ou senha inválidos'
        );
      }

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível fazer login'
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Login
      </Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

     <TouchableOpacity
        onPress={() => router.push('/cadastro')}
        >
        <Text>Criar conta</Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 15,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
  },

  button: {
    height: 50,
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    color: '#3b82f6',
    fontWeight: 'bold',
  },
});