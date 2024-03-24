import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAvailableBundleLanguage } from 'core/i18n';
import { Language } from 'core/models';
import * as Localization from 'expo-localization';

export type Theme = 'system' | 'light' | 'dark' | null;
type InitialState = {
  theme: Theme;
  language: Language;
};
const initialState: InitialState = {
  theme: null,
  language: getAvailableBundleLanguage(Localization.locale as Language),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
