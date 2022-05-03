import * as Sentry from 'sentry-expo';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { notificationActions } from 'core/modules/notifications/reducer';

export const useNotificationCb = () => {
  const responseListener = useRef<Subscription>();

  const dispatch = useDispatch();

  useEffect(() => {
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      Sentry.Browser.captureMessage('notification response', {
        contexts: {
          response: response as any,
        },
      });
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
