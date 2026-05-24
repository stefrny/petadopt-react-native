import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { PetItem } from '@/components/petItem';
import { PetProvider } from '@/context/petContext';
import { usePets } from '@/hooks/usePets';

function PetList() {
  const { pets, loading, error } = usePets();

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Carregando pets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pets}
      renderItem={({ item }) => <PetItem pet={item} />}
      keyExtractor={(item) => item._id}
    />
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <PetProvider>
        <SafeAreaView style={styles.container}>
          <PetList />
        </SafeAreaView>
      </PetProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
