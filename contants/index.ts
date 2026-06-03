import type { Pet } from '@/types';
import type { AgeRange } from '@/hooks';

export const GENDERS_MAP = {
  male: 'Macho',
  female: 'Fêmea',
} satisfies Record<Pet['gender'], string>;

export const AGE_RANGES_MAP = {
  filhote: 'Filhote',
  adulto: 'Adulto',
  idoso: 'Idoso',
} satisfies Record<AgeRange, string>;

export const CATEGORIES_MAP: Record<string, string> = {
  cat: 'Gato',
  dog: 'Cachorro',
  rabbit: 'Coelho',
  bird: 'Pássaro',
  fish: 'Peixe',
  other: 'Outro',
};
