import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { counterReducer } from '../modules/counter/reducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type AllActions = PayloadAction;

declare module 'react-redux' {
  export interface DefaultRootState extends State {}
}
