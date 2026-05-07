import { PetItem } from '@/components/petItem';
import { PetProvider, usePets } from '@/context/petContext';
import { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [telefone, setTelefone] = useState("")
    const [confsenha, setConfsenha] = useState("")

  return (
    <SafeAreaProvider>
      <PetProvider>
        <SafeAreaView style={styles.container}>
            <form  style={styles.form}>
                <label> 
                Nome {"  "}
                <input value={nome} onChange={(e)=>setNome(e.target.value)} id="nome" style={styles.input} type="text" />
                </label>
                <label>
                E-mail {"  "}    
                <input id="e-mail" style={styles.input} type="text" />
                </label>
                <label>
                Senha {"  "}   
                <input style={styles.input} type="text" />
                </label>
                <label> 
                Telefone {"  "}
                <input style={styles.input} type="text" />
                </label>
                <label> 
                Confirmação Senha {"  "}
                <input style={styles.input} type="text" />
                </label>


        <TouchableOpacity onPress={} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
            </form>

        </SafeAreaView>
      </PetProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',


    alignSelf: 'center', // centraliza horizontalmente


    display: 'flex',
    flexDirection: 'column',
    gap: 12, 

    borderRadius: 100,
    boxShadow: `
    10px 10px 10px rgba(0,0,0,0.5),
    -10px -10px 20px rgba(0, 0, 0, 0.05)
    `,
    },
    button: {
        width: '40%',
        height: 40,

        backgroundColor: '#3b82f6',

        borderRadius: 14,

        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

  }
);