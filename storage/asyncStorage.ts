import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX_KEY = `@PetAdopt:`;

export const asyncStorage = {
  async getItem<T = string>(key: string) {
    try {
      const data = await AsyncStorage.getItem(PREFIX_KEY + key);
      if (data === null) return null;

      return JSON.parse(data) as T;
    } catch (e) {
      console.error("[getItem] Unexpected error:", e);
      return null;
    }
  },

  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(PREFIX_KEY + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("[setItem] Unexpected error:", e);
      return false;
    }
  },

  async removeMany(keys: string[]) {
    try {
      await AsyncStorage.multiRemove(keys.map((key) => PREFIX_KEY + key));
      return true;
    } catch (e) {
      console.error("[removeMany] Unexpected error:", e);
      return false;
    }
  },
};
