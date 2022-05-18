import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'system' | 'light' | 'dark' | null;
type InitialState = {
  theme: Theme;
};
const initialState: InitialState = {
  theme: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
