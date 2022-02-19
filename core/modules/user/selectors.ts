import { createSelector } from '@reduxjs/toolkit';
import { State } from 'core/store/root-reducer';
import { userApi } from './query';

export const getUserStoreData = createSelector(
  (s: State) => userApi.endpoints.getUserStore.select({ userId: s.auth.userId })(s),
  store => store.data ?? [],
);
