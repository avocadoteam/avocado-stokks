import axios from 'axios';
import { baseUrl } from 'core/constants';

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
