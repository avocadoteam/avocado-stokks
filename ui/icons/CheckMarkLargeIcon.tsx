import { useTheme } from 'native-base';
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const CheckMarkLargeIcon = memo(() => {
  const { colors } = useTheme();
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <Path
        d="M5 14.28L11.4615 21L23 9"
        stroke={colors.checkMarkLargeIcon}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
