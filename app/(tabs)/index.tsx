import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { PetItem } from '@/components';
import { usePets, usePetFilters, AgeRange } from '@/hooks';
import { AGE_RANGES_MAP, GENDERS_MAP } from '@/contants';

export default function HomeScreen() {
  const petContext = usePets();
  const petFilters = usePetFilters(petContext.pets);

  const hasActiveFilters = Object.values(petFilters.filters).some(value => value !== '');

  const renderFooter = () => {
    if (!petContext.loadingMore) return <View style={{ height: 20 }} />;
    return (
      <View style={styles.loaderFooter}>
        <ActivityIndicator color="#3b82f6" />
      </View>
    );
  };

  if (petContext.loading && petContext.pets.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeHeader petFilters={petFilters} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={petFilters.filteredPets}
        ListHeaderComponent={<HomeHeader petFilters={petFilters} />}
        renderItem={({ item }) => <PetItem pet={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        onEndReached={petContext.fetchPets}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !petContext.loading ? (
            <View style={styles.center}>
              <Ionicons name="paw-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum pet encontrado.</Text>
              {hasActiveFilters && (
                <TouchableOpacity onPress={petFilters.resetFilters}>
                  <Text style={{ color: '#3b82f6', marginTop: 10, fontWeight: 'bold' }}>Limpar filtros</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

function HomeHeader({ petFilters }: { petFilters: ReturnType<typeof usePetFilters> }) {
  const hasActiveFilters = Object.values(petFilters.filters).some(value => value !== '');

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.welcomeText}>Olá! 👋</Text>
          <Text style={styles.title}>Encontre seu novo amigo</Text>
        </View>
        {hasActiveFilters && (
          <TouchableOpacity style={styles.resetButton} onPress={petFilters.resetFilters}>
            <Text style={styles.resetButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar pet por nome..."
          style={styles.searchInput}
          value={petFilters.filters.name}
          onChangeText={petFilters.setName}
        />
        {petFilters.filters.name !== '' && (
          <TouchableOpacity onPress={() => petFilters.setName('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Gênero e Idade */}
      <View style={styles.extraFiltersRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionLabel}>Gênero</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {Object.entries(GENDERS_MAP).map(([value, displayName]) => (
              <TouchableOpacity
                key={value}
                onPress={() => petFilters.toggleGender(value)}
                style={[styles.chip, styles.chipSmall, petFilters.filters.gender === value && styles.chipActive]}
              >
                <Text style={[styles.chipText, styles.chipTextSmall, petFilters.filters.gender === value && styles.chipTextActive]}>
                  {displayName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1.5, marginLeft: 10 }}>
          <Text style={styles.sectionLabel}>Idade</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {Object.entries(AGE_RANGES_MAP).map(([value, displayName]) => (
              <TouchableOpacity
                key={value}
                onPress={() => petFilters.toggleAgeRange(value as AgeRange)}
                style={[styles.chip, styles.chipSmall, petFilters.filters.ageRange === value && styles.chipActive]}
              >
                <Text style={[styles.chipText, styles.chipTextSmall, petFilters.filters.ageRange === value && styles.chipTextActive]}>
                  {displayName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  chipsContainer: {
    gap: 8,
    paddingBottom: 5,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  chipSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: '#3b82f6',
  },
  chipText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  chipTextSmall: {
    fontSize: 12,
  },
  chipTextActive: {
    color: '#fff',
  },
  extraFiltersRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loaderFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
});
