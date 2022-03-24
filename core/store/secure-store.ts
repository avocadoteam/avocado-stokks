import * as SecureStore from 'expo-secure-store';

export enum SecureStoreKey {
  Credentials = 'credentials',
}

export type SeureStoreValue = {
  [SecureStoreKey.Credentials]: { userId: number; password: string; type: 'bare' | 'google' };
};

export const secureStore = {
  set: async <T extends SecureStoreKey>(key: T, value: SeureStoreValue[T]) => {
    if (!(await SecureStore.isAvailableAsync())) return;
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },
  get: async <T extends SecureStoreKey>(key: T): Promise<SeureStoreValue[T] | null> => {
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
