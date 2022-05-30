import { getUserId, isAuthInProgress } from '../auth/selectors';

import { NavigationModal } from 'core/models';
import { State } from '../../store/root-reducer';
import { createSelector } from '@reduxjs/toolkit';

const modalsState = (state: State) => state.modals;

export const getVisibleModal = createSelector(modalsState, s => s.visibleModal);
export const isLoginModalVisible = createSelector(
  modalsState,
  getUserId,
  isAuthInProgress,
  (s, ga, loading) => s.visibleModal === NavigationModal.Login && !ga && !loading,
);
