import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationIntervalTarget, TriggerParam, UserNotificationUpdateModel } from '@models';

export type StockState = {
  selectedSymbol: string;
  isNotifyModalVisible: boolean;
  noticification: UserNotificationUpdateModel
};

const initialState: StockState = {
  selectedSymbol: '',
  isNotifyModalVisible: false,
  noticification: {
    notifyInterval: NotificationIntervalTarget.Daily,
    triggerParam: TriggerParam.Equals,
    triggerValue: "1200",
    delete: false
  }
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    },
    closeNotifyModal: (state) => {
      state.isNotifyModalVisible = false
    },
    openNotifyModal: (state) => {
      state.isNotifyModalVisible = true
    },
    setNotifyInterval: (state, action: PayloadAction<NotificationIntervalTarget>) => {
      state.noticification.notifyInterval = action.payload
    },
    setNotifyTriggerParam: (state, action: PayloadAction<TriggerParam>) => {
      state.noticification.triggerParam = action.payload
    },
    setNotifyTriggerValue: (state, action: PayloadAction<string>) => {
      state.noticification.triggerValue = action.payload
    }
  },
});

export const { selectSymbol, closeNotifyModal, openNotifyModal, setNotifyInterval, setNotifyTriggerParam, setNotifyTriggerValue } = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
