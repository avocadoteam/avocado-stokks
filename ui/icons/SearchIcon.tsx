import { useTheme } from 'native-base';
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const SearchIcon = memo(() => {
  const { colors } = useTheme();
  return (
    <Svg width="21" height="22" viewBox="0 0 21 22" fill="none">
      <Path
        d="M19.8714 20L15.6336 15.7622M15.6336 15.7622C17.095 14.3126 18 12.3031 18 10.0821C18 5.66383 14.4183 2.08211 10 2.08211C5.58172 2.08211 2 5.66383 2 10.0821C2 14.5004 5.58172 18.0821 10 18.0821C12.1973 18.0821 14.1877 17.1962 15.6336 15.7622Z"
        stroke={colors.primary[100]}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
