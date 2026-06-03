import { useContext } from 'react';

import { PetContext } from '@/contexts';

export function usePets() {
  return useContext(PetContext);
}
