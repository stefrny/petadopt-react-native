import { useContext } from 'react';

import { PetContext } from '@/context/petContext';

export function usePets() {
  const context = useContext(PetContext);

  if (context === undefined) {
    throw new Error('usePets deve ser usado dentro de PetProvider');
  }

  return context;
}
