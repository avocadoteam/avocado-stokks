import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store/root-reducer';

const stockState = (state: State) => state.notifications;

export const getNotification = createSelector(stockState, s => s.noticification);
