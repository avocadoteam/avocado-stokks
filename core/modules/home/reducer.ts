import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StockState = {
  isInfoModalVisible: boolean;
};

const initialState: StockState = {
  isInfoModalVisible: false,
};

export const stockSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    closeInfoModal: (state) => {
      state.isInfoModalVisible = false
    },
    openInfoModal: (state) => {
      state.isInfoModalVisible = true
    }
  },
});

export const { closeInfoModal, openInfoModal } = stockSlice.actions;
export const homeReducer = stockSlice.reducer;
