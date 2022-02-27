import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export const NotificationOutlineOffIcon = memo<Props>(({ color, width, height }) => {
  return (
    <Svg width={width ?? 28} height={height ?? 28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M2.53577 2.625L25.0358 25.125"
        stroke={color ?? '#34C075'}
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="bevel"
      />
      <Path
        d="M15.2143 23.4285C15.051 23.7544 14.8165 24.0249 14.5345 24.2129C14.2524 24.401 13.9326 24.5 13.6071 24.5C13.2816 24.5 12.9619 24.401 12.6798 24.2129C12.3978 24.0249 12.1633 23.7544 12 23.4285"
        stroke={color ?? '#34C075'}
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.0357 2.83957C11.0128 2.29358 12.1166 2 13.25 2C15.028 2 16.7331 2.72245 17.9903 4.00841C19.2475 5.29437 19.9538 7.03851 19.9538 8.85714C19.9538 10.573 20.163 12.026 20.4916 13.25M6.00844 13.25C5.44542 15.3473 4.53173 16.7721 3.71877 17.6945C3.34543 18.1181 3.69345 19.1429 4.2581 19.1429H11.2857"
        stroke={color ?? '#34C075'}
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
});
