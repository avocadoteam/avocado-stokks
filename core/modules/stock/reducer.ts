import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockState = {
  selectedSymbol: string;
  isGraphTouched: boolean;
  stockToBeAdded: string;
  activeMainIndex: number;
};

const initialState: StockState = {
  selectedSymbol: '',
  isGraphTouched: false,
  stockToBeAdded: '',
  activeMainIndex: 0,
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
    setActiveMainScreen: (state, action: PayloadAction<number>) => {
      state.activeMainIndex = action.payload;
    },
  },
});

export const stockActions = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
