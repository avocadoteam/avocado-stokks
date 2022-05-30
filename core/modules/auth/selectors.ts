import { State } from '../../store/root-reducer';
import { createSelector } from '@reduxjs/toolkit';

const authState = (state: State) => state.auth;

export const getToken = createSelector(authState, c => c.token);
export const getUserId = createSelector(authState, c => c.userId);

export const isAuthInProgress = createSelector(authState, c => c.loading);
export const shouldSkipAuthQuery = createSelector(getToken, isAuthInProgress, (t, loading) => !t || loading);
