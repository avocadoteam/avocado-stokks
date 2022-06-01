import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { secureStore, SecureStoreKey } from 'core/store/secure-store';
import { userApi } from '../user/query';

export type AtuhState = {
  token: string;
  userId: number;
  loading: boolean;
};

const initialState: AtuhState = {
  token: '',
  userId: 0,
  loading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeAuth: (state, action: PayloadAction<Pick<AtuhState, 'token' | 'userId'>>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.loading = false;
    },
    stopLoading: state => {
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(userApi.endpoints.deleteUser.matchFulfilled, state => {
      state.token = '';
      state.userId = 0;

      secureStore.delete(SecureStoreKey.Credentials);
    });
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
