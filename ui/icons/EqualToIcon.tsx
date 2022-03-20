import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const EqualToIcon = memo(() => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M7 9H17M7 15H17" stroke="#8D8D8D" strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );
});
