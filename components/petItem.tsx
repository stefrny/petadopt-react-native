import { Animated, Image, StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Pet } from '@/types';

interface PetItemProps {
  pet: Pet;
}

export function PetItem({ pet }: PetItemProps) {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pet.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <Animated.View style={[animatedStyle, {
        marginBottom: 4,
      }]}>
        <Animated.Text
          style={styles.text}>
          {pet.name}
        </Animated.Text>
      </Animated.View>

      <Animated.Text
        style={styles.subtitle}>
        {pet.gender}
      </Animated.Text>
      <Animated.Text
        style={styles.subtitle}>
        {pet.age} anos
      </Animated.Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 12,
  }
});
