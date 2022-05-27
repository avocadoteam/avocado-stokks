import * as Notifications from 'expo-notifications';

import { useEffect, useRef } from 'react';

import { Alert } from 'react-native';
import { Subscription } from 'expo-modules-core';
import { notificationActions } from 'core/modules/notifications/reducer';
import { stockActions } from 'core/modules/stock/reducer';
import { useDispatch } from 'react-redux';

export const useNotificationCb = () => {
  const responseListener = useRef<Subscription>();

  const dispatch = useDispatch();

  useEffect(() => {
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data as { symbolName: string };
      dispatch(stockActions.selectSymbol(data.symbolName));
      Alert.alert('Get notification of symbol ' + data.symbolName);
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  useEffect(() => {
    Notifications.getPermissionsAsync().then(d => {
      dispatch(
        notificationActions.allowNotifications(
          d.granted || d.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL,
        ),
      );
    });
  }, []);
};
