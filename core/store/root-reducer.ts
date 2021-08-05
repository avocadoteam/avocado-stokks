import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { authReducer } from 'core/modules/auth/reducer';
import { urlParserApi } from 'core/modules/url-parser/query';
import { counterReducer } from '../modules/counter/reducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  [urlParserApi.reducerPath]: urlParserApi.reducer,
});

export type State = ReturnType<typeof rootReducer>;
export type AllActions = PayloadAction;

declare module 'react-redux' {
  export interface DefaultRootState extends State {}
}
