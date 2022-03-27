import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store/root-reducer';

const snackbarState = (state: State) => state.snackbar;

export const getVisibleSnackbar = createSelector(snackbarState, s => s.visibleSnackbar);
