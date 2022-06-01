import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockState = {
  selectedSymbol: string;
  isGraphTouched: boolean;
  stockToBeAdded: string;
};

const initialState: StockState = {
  selectedSymbol: '',
  isGraphTouched: false,
  stockToBeAdded: '',
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    },
    setGraphTouched: (state, action: PayloadAction<boolean>) => {
      state.isGraphTouched = action.payload;
    },
    setStockToBeAdded: (state, action: PayloadAction<string>) => {
      state.stockToBeAdded = action.payload;
    },
  },
});

export const stockActions = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
