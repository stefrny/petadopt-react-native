import { PetItem } from '@/components/petItem';
import pets from '@/data/pets';
import { FlatList, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView, } from 'react-native-safe-area-context';

export default function HomeScreen() {

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pets}
        renderItem={({item}) => <PetItem pet={item}  />}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

