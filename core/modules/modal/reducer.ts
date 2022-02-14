import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationModal } from 'core/models';

export type ModalState = {
  visibleModal: false | NavigationModal;
};

const initialState: ModalState = {
  visibleModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: state => {
      state.visibleModal = false;
    },
    openModal: (state, action: PayloadAction<NavigationModal>) => {
      state.visibleModal = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
