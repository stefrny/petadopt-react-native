import { getPets } from '@/services/petService';
import { createContext, useContext, useEffect, useState } from 'react';

const PetContext = createContext(undefined);

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

export function usePets() {
  const context = useContext(PetContext);

  if (context === undefined) {
    throw new Error('usePets deve ser usado dentro de PetProvider');
  }

  return context;
}