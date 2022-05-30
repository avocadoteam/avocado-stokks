import { SecureStoreKey, secureStore } from 'core/store/secure-store';

import { auth } from 'core/modules/auth/auth-flow';
import { authActions } from 'core/modules/auth/reducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    secureStore.get(SecureStoreKey.Credentials).then(r => {
      if (r?.password && r?.userId) {
        auth({ password: r.password, username: r.userId })
          .then(a => {
            dispatch(authActions.completeAuth(a));
          })
          .catch(() => {
            dispatch(authActions.stopLoading());
          });
      } else {
        dispatch(authActions.stopLoading());
      }
    });
  }, []);
};
