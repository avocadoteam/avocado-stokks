import { State } from 'core/store/root-reducer';
import { createSelector } from '@reduxjs/toolkit';
import { userApi } from './query';

export const getUserStoreData = createSelector(
  (s: State) => userApi.endpoints.getUserStore.select()(s),
  store => store.data ?? [],
);
