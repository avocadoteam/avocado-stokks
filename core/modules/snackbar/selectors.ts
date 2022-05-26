import { State } from 'core/store/root-reducer';
import { createSelector } from '@reduxjs/toolkit';

const snackbarState = (state: State) => state.snackbar;

export const getVisibleSnackbar = createSelector(snackbarState, s => s.visibleSnackbar);
