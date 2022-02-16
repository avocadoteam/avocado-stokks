import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../store/root-reducer';

const stockState = (state: State) => state.stock;

export const getSelectedSymbol = createSelector(stockState, s => s.selectedSymbol);
export const getVisibleNotifyModal = createSelector(stockState, s => s.isNotifyModalVisible)
export const getNoticification = createSelector(stockState, s => s.noticification)
