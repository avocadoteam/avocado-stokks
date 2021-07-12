import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from 'core/modules/pokemon/query';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware),
});

type extendend = { hot: { accept: (f: string, cb: () => void) => void } } & NodeModule;

if (process.env.NODE_ENV === 'development' && (module as extendend).hot) {
  (module as extendend).hot.accept('./root-reducer', () => {
    const newRootReducer = require('./root-reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

setupListeners(store.dispatch);
