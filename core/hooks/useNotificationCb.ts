import * as Notifications from 'expo-notifications';

import { useEffect, useRef } from 'react';

import { NavigationContainerRef } from '@react-navigation/native';
import { NavigationScreen } from 'core/models';
import { Subscription } from 'expo-modules-core';
import { notificationActions } from 'core/modules/notifications/reducer';
import { stockActions } from 'core/modules/stock/reducer';
import { useDispatch } from 'react-redux';

export const useNotificationCb = (navigation: NavigationContainerRef | null) => {
  const responseListener = useRef<Subscription>();

  const dispatch = useDispatch();

  useEffect(() => {
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data as { symbolName: string };
      dispatch(stockActions.selectSymbol(data.symbolName));
      navigation?.navigate(NavigationScreen.Stock);
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  useEffect(() => {
    Notifications.getPermissionsAsync().then(d => {
      dispatch(notificationActions.allowNotifications(d.granted));
    });
  }, []);
};
