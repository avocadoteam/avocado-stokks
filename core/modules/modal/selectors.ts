import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../store/root-reducer';

const modalsState = (state: State) => state.modals;

export const getVisibleModal = createSelector(modalsState, s => s.visibleModal);
