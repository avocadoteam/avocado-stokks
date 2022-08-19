import { settingsActions } from 'core/modules/settings/reducer';
import { getTheme } from 'core/modules/settings/selector';
import { Box, Heading, useTheme } from 'native-base';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from 'ui/atoms/Separator';
import { CheckCircleIcon } from 'ui/icons/CheckCircleIcon';
import { MoonOutlineIcon } from 'ui/icons/MoonOutlineIcon';
import { SunOutlineIcon } from 'ui/icons/SunOutlineIcon';
import { SystemOutlineIcon } from 'ui/icons/SystemOutlineIcon';
import { SettingCell } from 'ui/SettingCell';

export const ThemeBanner = memo(() => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const cellPressHandler = useCallback((theme: 'light' | 'dark' | 'system') => {
    dispatch(settingsActions.setTheme(theme));
  }, []);
  return (
    <Box mt={3}>
      <Heading size={'sm'} color={colors.heading} px={5}>
        Theme
      </Heading>
      <Box>
        <SettingCell
          after={theme === 'system' && <CheckCircleIcon />}
          onPress={() => cellPressHandler('system')}
          before={<SystemOutlineIcon />}
        >
          System
        </SettingCell>
        <SettingCell
          after={theme === 'light' && <CheckCircleIcon />}
          onPress={() => cellPressHandler('light')}
          before={<SunOutlineIcon />}
        >
          Light
        </SettingCell>
        <SettingCell
          after={theme === 'dark' && <CheckCircleIcon />}
          onPress={() => cellPressHandler('dark')}
          before={<MoonOutlineIcon />}
        >
          Dark
        </SettingCell>
      </Box>
      <Separator />
    </Box>
  );
});
