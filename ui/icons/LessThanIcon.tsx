import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const LessThanIcon = memo(() => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 9L9.5 13.5L12.5 10.5L18 16M18 16H14M18 16V12"
        stroke="#8D8D8D"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
