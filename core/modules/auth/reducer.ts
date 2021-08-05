import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AtuhState = {
  token: string;
  userId: number;
};

const initialState: AtuhState = {
  token: '',
  userId: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeAuth: (state, action: PayloadAction<AtuhState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
