import { asyncStorage } from "@/storage";

const FAVORITES_KEY = "favorites";

/**
 * Busca todos os IDs de pets favoritados do storage.
 */
export async function getFavorites() {
  return (await asyncStorage.getItem<string[]>(FAVORITES_KEY)) ?? [];
}

/**
 * Adiciona um ID de pet à lista de favoritos no storage.
 */
export async function saveFavorite(petId: string) {
  const favorites = await getFavorites();
  if (favorites.includes(petId)) return;

  favorites.push(petId);
  await asyncStorage.setItem(FAVORITES_KEY, favorites);
}

/**
 * Remove um ID de pet da lista de favoritos no storage.
 */
export async function removeFavorite(petId: string) {
  const favorites = await getFavorites();
  const newFavorites = favorites.filter((id) => id !== petId);
  await asyncStorage.setItem(FAVORITES_KEY, newFavorites);
}
