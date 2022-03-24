import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../store/root-reducer';

const authState = (state: State) => state.auth;

export const getToken = createSelector(authState, c => c.token);
export const getUserId = createSelector(authState, c => c.userId);
export const isGoogleAuthorized = createSelector(authState, c => c.authType === 'google');
