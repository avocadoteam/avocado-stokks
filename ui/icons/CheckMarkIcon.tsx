import React, { memo } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const CheckMarkIcon = memo(() => {
  return (
    <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
      <Circle opacity="0.07" cx="15" cy="14.5" r="9.99997" fill="#46C882" />
      <Path
        d="M11.5 15.2352L13.7647 17.4999L18.7647 12.4999"
        stroke="#46C882"
        strokeWidth="1.99999"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
