import { configureStore } from '@reduxjs/toolkit';
import { notificationAwaiter } from 'core/modules/notifications/request';
import { notificationsApi } from 'core/modules/notifications/query';
import { rootReducer } from './root-reducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import { stockApi } from 'core/modules/stock/query';
import { urlParserApi } from 'core/modules/url-parser/query';
import { userApi } from 'core/modules/user/query';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(notificationAwaiter.middleware)
      .concat(urlParserApi.middleware, userApi.middleware, stockApi.middleware, notificationsApi.middleware),
});

type extendend = { hot: { accept: (f: string, cb: () => void) => void } } & NodeModule;

if (process.env.NODE_ENV === 'development' && (module as extendend).hot) {
  (module as extendend).hot.accept('./root-reducer', () => {
    const newRootReducer = require('./root-reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

setupListeners(store.dispatch);
