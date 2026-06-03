import { createContext, type ReactNode, useEffect, useState, useRef } from 'react';

import { useAuth } from '@/hooks';
import { getPets, getFavorites, saveFavorite, removeFavorite, getCategories } from '@/services';
import type { Pet, Category } from '@/types';

export type PetContextValue = {
  pets: Pet[];
  favorites: string[];
  selectedPetId: string | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  loadingMore: boolean;
  hasMore: boolean;
  fetchPets: () => Promise<void>;
  selectPet: (petId: string) => void;
  clearSelectedPet: () => void;
  setPetAsFavorite: (petId: string) => Promise<void>;
  removePetFromFavorites: (petId: string) => Promise<void>;
  isPetFavorite: (petId: string) => boolean;
};

export const PetContext = createContext<PetContextValue>({} as PetContextValue);

export function PetProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPetId, setSelectedPet] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    // Carrega dados simultaneamente no início
    async function loadInitialData() {
      const [storedFavorites, categoriesResponse] = await Promise.all([
        getFavorites(),
        getCategories(token!),
        fetchPets(),
      ]);

      setCategories(categoriesResponse.data ?? []);
      setFavorites(storedFavorites);
    }
    loadInitialData();
  }, []);

  async function fetchPets() {
    if (loading || loadingMore || !hasMore) return;

    if (pets.length > 0) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    const { data, error } = await getPets({ page: pageRef.current });

    if (error) setError(error);
    if (data && data.length > 0) {
      if (pageRef.current === 1) {
        setPets(data);
      } else {
        setPets(prev => [...prev, ...data]);
      }
      pageRef.current++;
    } else {
      setHasMore(false);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function selectPet(petId: string) {
    setSelectedPet(petId);
  }

  function clearSelectedPet() {
    setSelectedPet(null);
  }

  async function setPetAsFavorite(petId: string) {
    if (favorites.includes(petId)) return;
    setFavorites(prev => [...prev, petId]);
    await saveFavorite(petId);
  }

  async function removePetFromFavorites(petId: string) {
    setFavorites(prev => prev.filter(id => id !== petId));
    await removeFavorite(petId);
  }

  function isPetFavorite(petId: string) {
    return favorites.includes(petId);
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        favorites,
        selectedPetId,
        categories,
        loading,
        error,
        loadingMore,
        hasMore,
        fetchPets,
        selectPet,
        clearSelectedPet,
        setPetAsFavorite,
        removePetFromFavorites,
        isPetFavorite,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
