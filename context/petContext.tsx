import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { Pet } from '@/types';
import { getPets } from '@/services/petService';

export type PetContextValue = {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  fetchPets: () => Promise<void>;
};

export const PetContext = createContext<PetContextValue | undefined>(undefined);

export function PetProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPets() {
    try {
      setLoading(true);
      setError(null);

      const data = await getPets();
      setPets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar pets');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <PetContext.Provider
      value={{
        pets,
        loading,
        error,
        fetchPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
