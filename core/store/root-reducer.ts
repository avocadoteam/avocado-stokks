import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'core/modules/auth/reducer';
import { homeReducer } from 'core/modules/home/reducer';
import { stockApi } from 'core/modules/stock/query';
import { stockReducer } from 'core/modules/stock/reducer';
import { urlParserApi } from 'core/modules/url-parser/query';
import { userApi } from 'core/modules/user/query';

export const rootReducer = combineReducers({
  auth: authReducer,
  stock: stockReducer,
  home: homeReducer,
  [urlParserApi.reducerPath]: urlParserApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [stockApi.reducerPath]: stockApi.reducer,
});

export type State = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
  export interface DefaultRootState extends State {}
}
