import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../store/root-reducer';

const stockState = (state: State) => state.home;

export const getVisibleInfoModal = createSelector(stockState, s => s.isInfoModalVisible)
