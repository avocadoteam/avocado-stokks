<<<<<<< HEAD
import * as Crypto from 'expo-crypto';

import { SecureStoreKey, secureStore } from 'core/store/secure-store';
import { baseUrl, isDev } from 'core/constants';

import axios from 'axios';

const randomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generatePassword = () => Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, randomString(8));

export const authUser = async () => {
  let credentials = await secureStore.get(SecureStoreKey.Credentials);

  if (!credentials || !credentials.password || !credentials.userId) {
    const password = await generatePassword();
    const userId = await createUser({ password });
    credentials = {
      password,
      userId,
      type: 'bare',
    };
    await secureStore.set(SecureStoreKey.Credentials, credentials);
  }
  const { token } = await auth({ password: credentials.password, username: credentials.userId });

  return { token, userId: credentials.userId, authType: credentials.type };
};

export const clearStorageInDev = async () => {
  if (isDev) {
    await secureStore.delete(SecureStoreKey.Credentials);
  }
};

const createUser = async (data: { password: string }) => {
  const result = await axios({
    url: `${baseUrl}user`,
    method: 'post',
    data,
  });
  return result.data.data as number;
};
=======
import axios from 'axios';
import { baseUrl } from 'core/constants';
import { secureStore, SecureStoreKey } from 'core/store/secure-store';
>>>>>>> master

/**
 *
 * @param data
 * @returns jwt-token
 */
export const auth = async (data: { username: number | string; password: string }) => {
  const result = await axios({
    url: `${baseUrl}auth/login`,
    method: 'post',
    data,
  });
  return result.data.data as { token: string; userId: number };
};

export const authUser = async (username: string, password: string) => {
  try {
    const { token, userId } = await auth({ password, username });

    await secureStore.set(SecureStoreKey.Credentials, {
      password,
      userId,
    });
    return { token, userId };
  } catch (error) {
    return { error };
  }
};
