import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';

export const useNotificationCb = () => {
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.debug(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);
};
