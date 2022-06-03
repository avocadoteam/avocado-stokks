import { createSelector } from '@reduxjs/toolkit';
import { State } from 'core/store/root-reducer';

const stockState = (state: State) => state.notifications;

export const getNotification = createSelector(stockState, s => s.noticification);
export const isNotificationAllowed = createSelector(stockState, s => s.allowed);
export const getModalHeight = createSelector(stockState, s => s.modalHeight);
