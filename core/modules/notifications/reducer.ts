import { NotificationIntervalTarget, TriggerName, TriggerParam, UserNotificationInfo } from '@models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationsState = {
  noticification: UserNotificationInfo;
  allowed: boolean;
  modalHeight: number;
};

const initialState: NotificationsState = {
  noticification: {
    id: 0,
    triggerName: TriggerName.PriceMatch,
    notifyInterval: NotificationIntervalTarget.EveryHour,
    triggerParam: TriggerParam.Equals,
    triggerValue: '0',
    deleted: null,
  },
  allowed: false,
  modalHeight: 404,
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
    setNotification: (state, action: PayloadAction<UserNotificationInfo>) => {
      state.noticification = { ...action.payload };
    },
    allowNotifications: (state, a: PayloadAction<boolean>) => {
      state.allowed = a.payload;
    },
    setModalHeight: (state, a: PayloadAction<number>) => {
      state.modalHeight = a.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
