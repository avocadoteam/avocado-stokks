import axios from 'axios';
import { baseUrl } from 'core/constants';
import { secureStore, SecureStoreKey } from 'core/store/secure-store';

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
