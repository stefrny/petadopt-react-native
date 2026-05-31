import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { usePets } from '@/hooks/usePets';
import { GENDERS_MAP } from '@/contants';
import type { Pet } from '@/types';

interface PetItemProps {
  pet: Pet;
}

export function PetItem({ pet }: PetItemProps) {
  const { isPetFavorite, setPetAsFavorite, removePetFromFavorites } = usePets();
  
  const favorited = isPetFavorite(pet._id);

  async function toggleFavorite() {
    if (favorited) {
      await removePetFromFavorites(pet._id);
    } else {
      await setPetAsFavorite(pet._id);
    }
  }

  function handlePress() {
    router.push(`/pet/${pet._id}`);
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={favorited ? "heart" : "heart-outline"} 
          size={24} 
          color={favorited ? "#ef4444" : "#666"} 
        />
      </TouchableOpacity>

      <Image
        source={{ uri: pet.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ marginBottom: 4 }}>
        <Text style={styles.text}>
          {pet.name}
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {GENDERS_MAP[pet.gender]}
      </Text>
      <Text style={styles.subtitle}>
        {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70, 
    marginBottom: 12,
    backgroundColor: '#eee',
  }
});
