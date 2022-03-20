import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const GreaterThanIcon = memo(() => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M5 16.5L9.5 12L12.5 15L18 9.5M18 9.5H14M18 9.5V13.5"
        stroke="#8D8D8D"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
