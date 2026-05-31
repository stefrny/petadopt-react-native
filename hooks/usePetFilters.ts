import { useReducer, useMemo } from "react";

import type { Pet } from "@/types";

export type AgeRange = 'filhote' | 'adulto' | 'idoso';

const AGE_RANGES_MAP: Record<AgeRange, [number, number]> = {
  filhote: [0, 2],
  adulto: [3, 12],
  idoso: [13, Infinity],
};

type FilterState = {
  name: string;
  gender: string;
  ageRange: AgeRange | "";
};

type FilterAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "TOGGLE_GENDER"; payload: string }
  | { type: "TOGGLE_AGE_RANGE"; payload: AgeRange }
  | { type: "RESET" };

const initialState: FilterState = {
  name: "",
  gender: "",
  ageRange: "",
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "TOGGLE_GENDER":
      return {
        ...state,
        gender: state.gender === action.payload ? "" : action.payload,
      };
    case "TOGGLE_AGE_RANGE":
      return { ...state, ageRange: state.ageRange === action.payload ? "" : action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

/**
 * Hook customizado para gerenciar a lógica de filtragem de pets em memória.
 */
export function usePetFilters(pets: Pet[]) {
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  // useMemo garante que o filtro só rode se a lista de pets ou os filtros mudarem
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesName =
        !filters.name ||
        pet.name.toLowerCase().includes(filters.name.toLowerCase().trim());
      const matchesGender = !filters.gender || pet.gender === filters.gender;
      const matchesAgeRange =
        !filters.ageRange ||
          (pet.age >= AGE_RANGES_MAP[filters.ageRange][0] &&
            pet.age <= AGE_RANGES_MAP[filters.ageRange][1]);

      return matchesName && matchesGender && matchesAgeRange;
    });
  }, [pets, filters]);

  return {
    filters,
    filteredPets,
    setName: (name: string) => dispatch({ type: "SET_NAME", payload: name }),
    toggleGender: (gender: string) =>
      dispatch({ type: "TOGGLE_GENDER", payload: gender }),
    toggleAgeRange: (ageRange: AgeRange) =>
      dispatch({ type: "TOGGLE_AGE_RANGE", payload: ageRange }),
    resetFilters: () => dispatch({ type: "RESET" }),
  };
}
