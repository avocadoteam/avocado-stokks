import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckCircleIcon } from 'ui/icons/CheckCircleIcon';
import { NotificationOutlineIcon } from 'ui/icons/NotificationOutlineIcon';
import { NotificationOutlineOffIcon } from 'ui/icons/NotificationOutlineOffIcon';
import { Separator } from 'ui/atoms/Separator';
import { SettingCell } from 'ui/SettingCell';
import { currentDevice } from 'core/constants';
import { isNotificationAllowed } from 'core/modules/notifications/selectors';
import { notificationActions } from 'core/modules/notifications/reducer';
import { useEditExpoSettingsMutation } from 'core/modules/notifications/query';

export const NotificationsBanner = memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [editExpoSettings] = useEditExpoSettingsMutation();
  const isNotificationTurnedOn = useSelector(isNotificationAllowed);

  const handleOffNotification = () => {
    dispatch(notificationActions.allowNotifications(false));
    editExpoSettings({ device: currentDevice, enable: false });
  };
  const handleOnNotification = () => {
    dispatch(notificationActions.allowNotifications(true));
    editExpoSettings({ device: currentDevice, enable: true });
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
