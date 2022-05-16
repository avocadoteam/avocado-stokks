import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Separator } from 'ui/atoms/Separator';
import { NotificationOutlineIcon } from 'ui/icons/NotificationOutlineIcon';
import { NotificationOutlineImportantIcon } from 'ui/icons/NotificationOutlineImportantIcon';
import { NotificationOutlineOffIcon } from 'ui/icons/NotificationOutlineOffIcon';
import { SettingCell } from 'ui/SettingCell';

export const NotificationsBanner = memo(() => {
  const { colors } = useTheme();
  return (
    <Box mb={2}>
      <Heading size={'sm'} my={2} color={colors.heading}>
        Notifications
      </Heading>
      <Box>
        <SettingCell before={<NotificationOutlineIcon width={20} height={22} color={colors.headingSmall} />}>On</SettingCell>
        <SettingCell before={<NotificationOutlineImportantIcon width={20} height={22} color={colors.headingSmall} />}>
          Important
        </SettingCell>
        <SettingCell before={<NotificationOutlineOffIcon width={20} height={22} color={colors.headingSmall} />}>
          Off
        </SettingCell>
      </Box>
      <Separator />
    </Box>
  );
});
