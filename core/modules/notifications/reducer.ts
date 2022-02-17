import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationIntervalTarget, TriggerParam, UserNotificationUpdateModel } from '@models';

export type NotificationsState = {
  noticification: UserNotificationUpdateModel;
};

const initialState: NotificationsState = {
  noticification: {
    notifyInterval: NotificationIntervalTarget.Daily,
    triggerParam: TriggerParam.Equals,
    triggerValue: '1200',
    delete: false,
  },
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifyInterval: (state, action: PayloadAction<NotificationIntervalTarget>) => {
      state.noticification.notifyInterval = action.payload;
    },
    setNotifyTriggerParam: (state, action: PayloadAction<TriggerParam>) => {
      state.noticification.triggerParam = action.payload;
    },
    setNotifyTriggerValue: (state, action: PayloadAction<string>) => {
      state.noticification.triggerValue = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
