import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../store/root-reducer';

const counterState = (state: State) => state.counter;

export const getCounterValue = createSelector(counterState, c => c.value);
