import { Image, StyleSheet, Text, View } from 'react-native';
import { Pet } from '@/types';

interface PetItemProps {
  pet: Pet;
}

export function PetItem({ pet }: PetItemProps) {
  return (
    <View style={styles.container}>
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
        {pet.gender}
      </Text>
      <Text style={styles.subtitle}>
        {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
      </Text>
    </View>
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
    borderRadius: 70, // Círculo para um visual mais moderno
    marginBottom: 12,
    backgroundColor: '#eee',
  }
});
