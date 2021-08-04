import * as SecureStore from 'expo-secure-store';

export enum SecureStoreKey {
  Credentials = 'credentials',
}

export type SeureStoreValue = {
  [SecureStoreKey.Credentials]: { userId: number; password: string };
};

export const secureStore = {
  set: async <T extends SecureStoreKey>(key: T, value: SeureStoreValue[T]) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },
  get: async <T extends SecureStoreKey>(key: T): Promise<SeureStoreValue[T] | null> => {
    const v = await SecureStore.getItemAsync(key);
    if (v === null) return v;

    return JSON.parse(v);
  },
  delete: <T extends SecureStoreKey>(key: T) => SecureStore.deleteItemAsync(key),
};
