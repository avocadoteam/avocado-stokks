import { createListenerMiddleware } from '@reduxjs/toolkit';
import { State } from 'core/store/root-reducer';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Browser } from 'sentry-expo';
import { authActions } from '../auth/reducer';
import { notificationToggle } from './actions';
import { notificationsApi } from './query';

const registerForPushNotifications = async () => {
  let token: string = '';
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Browser.captureMessage('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Browser.captureMessage('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
};

export const notificationAwaiter = createListenerMiddleware();
export const notificationManualAwaiter = createListenerMiddleware();

notificationAwaiter.startListening({
  actionCreator: authActions.completeAuth,
  effect: async (action, listenerApi) => {
    // Can cancel other running instances
    // listenerApi.cancelActiveListeners();
    // TODO: this needs to study hard the fq docs about certificates and keys
    // Run async logic
    Browser.captureMessage('notificationAwaiter complete auth', {
      contexts: {
        action: action as any,
      },
    });
    const token = await registerForPushNotifications();
    Browser.captureMessage('notificationAwaiter got token', {
      contexts: {
        token: token as any,
      },
    });
    if (token) {
      listenerApi.dispatch(notificationsApi.endpoints.installPushToken.initiate({ token, userId: action.payload.userId }));
    }
  },
});
notificationManualAwaiter.startListening({
  actionCreator: notificationToggle,
  effect: async (action, listenerApi) => {
    // Can cancel other running instances
    // listenerApi.cancelActiveListeners();
    // TODO: this needs to study hard the fq docs about certificates and keys
    // Run async logic
    Browser.captureMessage('notificationAwaiter complete auth', {
      contexts: {
        action: action as any,
      },
    });
    const token = await registerForPushNotifications();
    Browser.captureMessage('notificationAwaiter got token', {
      contexts: {
        token: token as any,
      },
    });
    if (token) {
      const userId = (listenerApi.getState() as State).auth.userId;
      listenerApi.dispatch(notificationsApi.endpoints.installPushToken.initiate({ token, userId }));
    }
  },
});
