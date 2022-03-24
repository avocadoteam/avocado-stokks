import { createSelector } from '@reduxjs/toolkit';
import { NavigationModal } from 'core/models';
import { State } from '../../store/root-reducer';
import { isGoogleAuthorized } from '../auth/selectors';

const modalsState = (state: State) => state.modals;

export const getVisibleModal = createSelector(modalsState, s => s.visibleModal);
export const isLoginModalVisible = createSelector(
  modalsState,
  isGoogleAuthorized,
  (s, ga) => s.visibleModal === NavigationModal.Login && !ga,
);
