import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockState = {
  selectedSymbol: string;
  isGraphTouched: boolean;
<<<<<<< HEAD
=======
  stockToBeAdded: string;
  activeMainIndex: number;
>>>>>>> master
};

const initialState: StockState = {
  selectedSymbol: '',
  isGraphTouched: false,
<<<<<<< HEAD
=======
  stockToBeAdded: '',
  activeMainIndex: 0,
>>>>>>> master
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
<<<<<<< HEAD
=======
    setStockToBeAdded: (state, action: PayloadAction<string>) => {
      state.stockToBeAdded = action.payload;
    },
    setActiveMainScreen: (state, action: PayloadAction<number>) => {
      state.activeMainIndex = action.payload;
    },
>>>>>>> master
  },
});

export const stockActions = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
