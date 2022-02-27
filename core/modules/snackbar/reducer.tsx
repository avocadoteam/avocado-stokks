import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationSnackbar } from 'core/models';
import React from 'react';

type SnackbarState = {
  visibleSnackbar: NavigationSnackbar | null;
};

const initialState: SnackbarState = {
  visibleSnackbar: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<NavigationSnackbar>) => {
      state.visibleSnackbar = action.payload;
    },
    closeSnackbar: state => {
      state.visibleSnackbar = null;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;
