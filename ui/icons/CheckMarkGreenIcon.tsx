import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const CheckMarkGreenIcon = memo(() => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <Path
        d="M4.35718 13.3L11.2803 20.5L23.6429 7.64288"
        stroke="#03CF6D"
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
});
