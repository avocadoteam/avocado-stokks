import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Separator } from 'ui/atoms/Separator';
import { MoonOutlineIcon } from 'ui/icons/MoonOutlineIcon';
import { SunOutlineIcon } from 'ui/icons/SunOutlineIcon';
import { SystemOutlineIcon } from 'ui/icons/SystemOutlineIcon';
import { SettingCell } from 'ui/SettingCell';

export const ThemeBanner = memo(() => {
  const { colors } = useTheme();
  return (
    <Box mb={2}>
      <Heading size={'sm'} my={2} color={colors.heading}>
        Theme
      </Heading>
      <Box>
        <SettingCell before={<SystemOutlineIcon />}>System</SettingCell>
        <SettingCell before={<SunOutlineIcon />}>Light</SettingCell>
        <SettingCell before={<MoonOutlineIcon />}>Dark</SettingCell>
      </Box>
      <Separator />
    </Box>
  );
});
