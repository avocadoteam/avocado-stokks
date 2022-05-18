import { darkTheme, lightTheme } from './core/theme';
import { NativeBaseProvider } from 'native-base';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { getTheme } from 'core/modules/settings/selector';
import { getThemeFromStorage, setThemeInStorage } from 'core/modules/settings/settings-flow';
import { settingsActions } from 'core/modules/settings/reducer';

export const ThemeProvider = memo(({ children }) => {
  let colorScheme = useColorScheme();
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!theme) {
      getThemeFromStorage().then(res => dispatch(settingsActions.setTheme(res ?? 'system')));
    } else {
      setThemeInStorage(theme);
    }
  }, [theme]);
  return (
    <NativeBaseProvider
      theme={
        theme === 'system' || theme === null
          ? colorScheme === 'light'
            ? lightTheme
            : darkTheme
          : theme === 'light'
          ? lightTheme
          : darkTheme
      }
    >
      {children}
    </NativeBaseProvider>
  );
});
