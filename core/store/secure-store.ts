import * as SecureStore from 'expo-secure-store';

export enum SecureStoreKey {
  Credentials = 'credentials',
  Theme = 'theme',
}

export type SecureStoreValue = {
<<<<<<< HEAD
  [SecureStoreKey.Credentials]: { userId: number; password: string; type: 'bare' | 'google' };
=======
  [SecureStoreKey.Credentials]: { userId: number; password: string };
>>>>>>> master
  [SecureStoreKey.Theme]: { theme: 'system' | 'light' | 'dark' };
};

export const secureStore = {
  set: async <T extends SecureStoreKey>(key: T, value: SecureStoreValue[T]) => {
    if (!(await SecureStore.isAvailableAsync())) return;
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },
  get: async <T extends SecureStoreKey>(key: T): Promise<SecureStoreValue[T] | null> => {
    if (!(await SecureStore.isAvailableAsync())) return null;
    const v = await SecureStore.getItemAsync(key);
    if (v === null) return v;

    return JSON.parse(v);
  },
  delete: async <T extends SecureStoreKey>(key: T) => {
    if (!(await SecureStore.isAvailableAsync())) return;
    await SecureStore.deleteItemAsync(key);
  },
};
