import { auth } from 'core/modules/auth/auth-flow';
import { authActions } from 'core/modules/auth/reducer';
import { secureStore, SecureStoreKey } from 'core/store/secure-store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
