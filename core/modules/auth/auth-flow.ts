import axios from 'axios';
import { baseUrl, isDev } from 'core/constants';
import { secureStore, SecureStoreKey } from 'core/store/secure-store';
import * as Crypto from 'expo-crypto';

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
export const authUserDev = async () => {
  const { token, userId } = await auth({ password: 'test123', username: 'testuserdev' });

  return { token, userId };
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
