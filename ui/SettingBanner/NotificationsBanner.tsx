import { notificationActions } from 'core/modules/notifications/reducer';
import { isNotificationAllowed } from 'core/modules/notifications/selectors';
import * as Notifications from 'expo-notifications';
import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from 'ui/atoms/Separator';
import { CheckCircleIcon } from 'ui/icons/CheckCircleIcon';
import { NotificationOutlineIcon } from 'ui/icons/NotificationOutlineIcon';
import { NotificationOutlineOffIcon } from 'ui/icons/NotificationOutlineOffIcon';
import { SettingCell } from 'ui/SettingCell';

export const NotificationsBanner = memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isNotificationTurnedOn = useSelector(isNotificationAllowed);
  const handleOffNotification = () => {
    dispatch(notificationActions.allowNotifications(false));
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        iosDisplayInForeground: false,
      }),
    });
  };
  const handleOnNotification = () => {
    dispatch(notificationActions.allowNotifications(true));
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        iosDisplayInForeground: false,
      }),
    });
  };

  return (
    <Box mt={3}>
      <Heading size={'sm'} color={colors.heading}>
        Notifications
      </Heading>
      <Box>
        <SettingCell
          onPress={handleOnNotification}
          after={isNotificationTurnedOn && <CheckCircleIcon />}
          before={<NotificationOutlineIcon width={20} height={22} color={colors.headingSmall} />}
        >
          On
        </SettingCell>
        <SettingCell
          onPress={handleOffNotification}
          after={!isNotificationTurnedOn && <CheckCircleIcon />}
          before={<NotificationOutlineOffIcon width={24} height={24} color={colors.headingSmall} />}
        >
          Off
        </SettingCell>
      </Box>
      <Separator />
    </Box>
  );
});
