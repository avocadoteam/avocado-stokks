import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AtuhState = {
  token: string;
  userId: number;
  authType: 'google' | 'bare';
};

const initialState: AtuhState = {
  token: '',
  userId: 0,
  authType: 'bare',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeAuth: (state, action: PayloadAction<AtuhState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.authType = action.payload.authType;
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
