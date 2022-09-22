import { getTheme } from 'core/modules/settings/selector';
import { useMemo } from 'react';
import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';

export const useUserTheme = () => {
  const systemTheme = Appearance.getColorScheme();
  const pickedTheme = useSelector(getTheme);
  const theme = useMemo(
    () => (pickedTheme === 'system' || pickedTheme === null ? systemTheme : pickedTheme),
    [systemTheme, pickedTheme],
  );
  return theme;
};
