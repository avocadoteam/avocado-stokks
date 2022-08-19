import { useTheme } from 'native-base';
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowBackIcon = memo(() => {
  const { colors } = useTheme();
  return (
    <Svg width="18" height="17" viewBox="0 0 18 17" fill="none">
      <Path
        d="M16.5 8.5H1.5M1.5 8.5L9 16M1.5 8.5L9 1"
        stroke={colors.primary[100]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
