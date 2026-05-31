import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePets } from '@/hooks/usePets';
import { Pet } from '@/types';
import { getPetById } from '@/services/petApi';
import { useAuth } from '@/hooks/useAuth';

const { width } = Dimensions.get('window');

export default function PetDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { pets, isPetFavorite, setPetAsFavorite, removePetFromFavorites } = usePets();
  const { token } = useAuth(); // Precisamos do token para o getPetById se necessário
  
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  const favorited = pet ? isPetFavorite(pet._id) : false;

  useEffect(() => {
    async function loadPet() {
      // Tenta achar no contexto primeiro (mais rápido)
      const foundPet = pets.find((p) => p._id === id);
      
      if (foundPet) {
        setPet(foundPet);
        setLoading(false);
      } else if (id && token) {
        // Se não achou (ex: link direto), busca na API
        const { data, error } = await getPetById(id, token);
        if (data) setPet(data);
        setLoading(false);
      }
    }

    loadPet();
  }, [id, pets, token]);

  const toggleFavorite = async () => {
    if (!pet) return;
    if (favorited) {
      await removePetFromFavorites(pet._id);
    } else {
      await setPetAsFavorite(pet._id);
    }
  };

  const handleContact = () => {
    if (!pet) return;
    const message = `Olá, vi o ${pet.name} no Pet Adopt e gostaria de saber mais sobre a adoção!`;
    const url = `whatsapp://send?phone=55${pet.user.phone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Fallback para link web se o app não estiver instalado
        Linking.openURL(`https://wa.me/55${pet.user.phone}?text=${encodeURIComponent(message)}`);
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.center}>
        <Text>Pet não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#3b82f6', marginTop: 10 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com Imagem */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.images[0] }} style={styles.image} />
          
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Ionicons 
              name={favorited ? "heart" : "heart-outline"} 
              size={28} 
              color={favorited ? "#ef4444" : "#333"} 
            />
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <View>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.breed}>{pet.breed || 'SRD'}</Text>
            </View>
            <View style={[styles.genderBadge, { backgroundColor: pet.gender === 'male' ? '#dbeafe' : '#fce7f3' }]}>
              <Ionicons 
                name={pet.gender === 'male' ? "male" : "female"} 
                size={16} 
                color={pet.gender === 'male' ? "#1e40af" : "#9d174d"} 
              />
              <Text style={[styles.genderText, { color: pet.gender === 'male' ? "#1e40af" : "#9d174d" }]}>
                {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
              </Text>
            </View>
          </View>

          {/* Características */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{pet.age}</Text>
              <Text style={styles.statLabel}>{pet.age === 1 ? 'Ano' : 'Anos'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{pet.weight}kg</Text>
              <Text style={styles.statLabel}>Peso</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{pet.color}</Text>
              <Text style={styles.statLabel}>Cor</Text>
            </View>
          </View>

          {/* História */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minha História</Text>
            <Text style={styles.story}>{pet.story || 'Este pet está esperando por um novo lar cheio de amor!'}</Text>
          </View>

          {/* Dono */}
          <View style={styles.ownerCard}>
            <View style={styles.ownerInfo}>
              <View style={styles.ownerAvatar}>
                <Ionicons name="person" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.ownerName}>{pet.user.name}</Text>
                <Text style={styles.ownerLabel}>Dono(a) / Protetor(a)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.ownerContact} onPress={handleContact}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Botão de Ação Fixo */}
      <SafeAreaView style={styles.footer} edges={['bottom']}>
        <TouchableOpacity style={styles.adoptButton} onPress={handleContact}>
          <Text style={styles.adoptButtonText}>Quero Adotar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: width * 1.1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  breed: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  genderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 5,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statBox: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 15,
    width: (width - 70) / 3,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  story: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  ownerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ownerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ownerLabel: {
    fontSize: 12,
    color: '#666',
  },
  ownerContact: {
    padding: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  adoptButton: {
    backgroundColor: '#3b82f6',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
