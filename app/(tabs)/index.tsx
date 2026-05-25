import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PetItem } from '@/components/petItem';
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
      contentContainerStyle={styles.list}
    />
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PetList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
