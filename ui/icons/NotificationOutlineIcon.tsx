import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export const NotificationOutlineIcon = memo<Props>(({ color, width, height }) => {
  return (
    <Svg width={width ?? 30} height={height ?? 31} viewBox="0 0 30 31" fill="none">
      <Path
        d="M21.1681 11.1071C21.1681 9.28851 20.4618 7.54437 19.2046 6.25841C17.9474 4.97245 16.2423 4.25 14.4643 4.25C12.6863 4.25 10.9812 4.97245 9.72396 6.25841C8.46675 7.54437 7.76045 9.28851 7.76045 11.1071C7.76045 15.7649 6.21937 18.4857 4.93171 19.946C4.55827 20.3696 4.90774 21.3929 5.4724 21.3929H23.4562C24.0208 21.3929 24.3703 20.3696 23.9969 19.946C22.7092 18.4857 21.1681 15.7649 21.1681 11.1071Z"
        stroke={color ?? '#03CF6D'}
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.0714 25.6786C15.9081 26.0045 15.6737 26.275 15.3916 26.463C15.1096 26.651 14.7898 26.75 14.4643 26.75C14.1388 26.75 13.819 26.651 13.537 26.463C13.2549 26.275 13.0205 26.0045 12.8571 25.6786"
        stroke={color ?? '#03CF6D'}
        stroke-width="2.41071"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
});
