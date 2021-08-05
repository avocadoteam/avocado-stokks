import axios from 'axios';
import Constants from 'expo-constants';
import * as Crypto from 'expo-crypto';
import { secureStore, SecureStoreKey } from 'core/store/secure-store';
import { baseUrl } from 'core/constants';

const generatePassword = () =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, Constants.manifest.extra?.credentialSecret);

export const authUser = async () => {
  let credentials = await secureStore.get(SecureStoreKey.Credentials);

  if (!credentials) {
    const password = await generatePassword();
    const userId = await createUser({ password });
    credentials = {
      password,
      userId,
    };
    await secureStore.set(SecureStoreKey.Credentials, credentials);
  }
  const token = await auth({ password: credentials.password, username: credentials.userId });

  return { token, userId: credentials.userId };
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
const auth = async (data: { username: number; password: string }) => {
  const result = await axios({
    url: `${baseUrl}auth/login`,
    method: 'post',
    data,
  });
  return result.data.data as string;
};
