import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockState = {
  selectedSymbol: string;
};

const initialState: StockState = {
  selectedSymbol: '',
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    },
  },
});

export const stockActions = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
