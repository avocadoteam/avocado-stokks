import { createSelector } from '@reduxjs/toolkit';
import { State } from 'core/store/root-reducer';

const settingsState = (state: State) => state.settings;

export const getTheme = createSelector(settingsState, s => s.theme);
