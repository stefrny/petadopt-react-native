import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Redirect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createPet } from '@/services';
import { useAuth, usePets } from '@/hooks';
import type { CreatePetPayload, Pet } from '@/types';
import { CATEGORIES_MAP } from '@/contants';

export default function CreatePetScreen() {
  const { token } = useAuth();
  const { categories } = usePets();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [story, setStory] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState<Pet['gender']>('male');
  const [imageUrl, setImageUrl] = useState('');

  if (!token) {
    return <Redirect href="/login" />;
  }

  function resetForm() {
    setName('');
    setAge('');
    setBreed('');
    setWeight('');
    setColor('');
    setStory('');
    setCategory('');
    setGender('male');
    setImageUrl('');
  }

  async function handleCreate() {
    if (!name || !age || !weight || !color || !category || !imageUrl || !story) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);

      const payload: CreatePetPayload = {
        name,
        age: Number(age),
        weight: Number(weight),
        color,
        story,
        category,
        gender,
        images: [imageUrl],
        breed: breed.trim() || 'SRD',
        available: true,
      };

      const { error } = await createPet(payload, token!);

      if (error) throw new Error(error);

      Alert.alert('Sucesso', 'Pet cadastrado com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
        { text: 'Cadastrar outro', onPress: () => resetForm() }
      ]);
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Não foi possível salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Pet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome do Pet *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Rex"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Raça (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Golden Retriever (pode deixar vazio se não souber)"
          value={breed}
          onChangeText={setBreed}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Idade (anos) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.label}>Peso (kg) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
        </View>

        <Text style={styles.label}>Cor *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Caramelo"
          value={color}
          onChangeText={setColor}
        />

        <Text style={styles.label}>Gênero *</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
            onPress={() => setGender('male')}
          >
            <Ionicons name="male" size={20} color={gender === 'male' ? '#fff' : '#666'} />
            <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>Macho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
            onPress={() => setGender('female')}
          >
            <Ionicons name="female" size={20} color={gender === 'female' ? '#fff' : '#666'} />
            <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>Fêmea</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Categoria *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c._id}
              style={[styles.catChip, category === c._id && styles.catChipActive]}
              onPress={() => setCategory(c._id)}
            >
              <Text style={[styles.catChipText, category === c._id && styles.catChipTextActive]}>
                {CATEGORIES_MAP[c.name]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>URL da Imagem *</Text>
        <TextInput
          style={styles.input}
          placeholder="https://exemplo.com/foto.jpg"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <Text style={styles.label}>História *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conte um pouco sobre este pet..."
          multiline
          numberOfLines={4}
          value={story}
          onChangeText={setStory}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar Pet</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 15,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  genderButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  genderText: {
    color: '#666',
    fontWeight: '600',
  },
  genderTextActive: {
    color: '#fff',
  },
  categoryScroll: {
    marginBottom: 5,
  },
  catChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 10,
  },
  catChipActive: {
    backgroundColor: '#3b82f6',
  },
  catChipText: {
    color: '#666',
    fontWeight: '500',
  },
  catChipTextActive: {
    color: '#fff',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
