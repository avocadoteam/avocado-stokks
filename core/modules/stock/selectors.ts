import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../store/root-reducer';

const stockState = (state: State) => state.stock;

export const getSelectedSymbol = createSelector(stockState, s => s.selectedSymbol);
export const getGraphTouched = createSelector(stockState, s => s.isGraphTouched);
