import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { RemoveIcon } from 'ui/icons/RemoveIcon';

import { SettingCell } from 'ui/SettingCell';

export const DangerBanner = memo(() => {
  const { colors } = useTheme();
  return (
    <Box my={2}>
      <SettingCell textColor={colors.downTextColor} before={<RemoveIcon />}>
        Delete all data
      </SettingCell>
    </Box>
  );
});
