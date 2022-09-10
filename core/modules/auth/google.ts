import { secureStore, SecureStoreKey } from 'core/store/secure-store';

import axios from 'axios';
import { baseUrl } from 'core/constants';
import { buildQueryString } from 'core/operations/common';
import { auth } from './auth-flow';

const getGUserInfo = async (accessToken: string) => {
  const { data } = await axios({
    url: `https://www.googleapis.com/oauth2/v2/userinfo${buildQueryString([
      { access_token: accessToken },
      { fields: ['name', 'email', 'id'].join(',') },
    ])}`,
    method: 'get',
  });
  const { email, id } = data;
  return {
    email,
    id,
  };
};

const createGoogleUser = async (data: { email: string; id: string }) => {
  const result = await axios({
    url: `${baseUrl}stocks/user/google`,
    method: 'post',
    data,
  });
  return result.data.data as number;
};

export const authGoogleUser = async (accessToken: string) => {
  const { email, id } = await getGUserInfo(accessToken);
  const userId = await createGoogleUser({ email, id });

  await secureStore.set(SecureStoreKey.Credentials, {
    password: id,
    userId,
  });

  const { token } = await auth({ password: id, username: userId });

  return { token, userId };
};
