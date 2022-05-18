import { secureStore, SecureStoreKey } from 'core/store/secure-store';
import { Theme } from './reducer';

export const getThemeFromStorage = async () => {
  return (await secureStore.get(SecureStoreKey.Theme))?.theme;
};

export const setThemeInStorage = async (theme: Theme) => {
  await secureStore.set(SecureStoreKey.Theme, { theme: theme ?? 'system' });
};
