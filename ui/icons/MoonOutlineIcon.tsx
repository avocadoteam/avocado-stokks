import { useTheme } from 'native-base';
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const MoonOutlineIcon = memo(() => {
  const { colors } = useTheme();
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M19 10.79C18.8427 12.4922 18.2039 14.1144 17.1583 15.4668C16.1127 16.8192 14.7035 17.8458 13.0957 18.4265C11.4879 19.0073 9.74801 19.1181 8.07952 18.7461C6.41104 18.3741 4.88302 17.5345 3.67425 16.3258C2.46548 15.117 1.62596 13.589 1.25393 11.9205C0.881899 10.252 0.992739 8.51208 1.57348 6.9043C2.15423 5.29651 3.18085 3.88737 4.53324 2.84175C5.88562 1.79614 7.50782 1.15731 9.21002 1C8.21344 2.34827 7.73387 4.00945 7.85856 5.68141C7.98324 7.35338 8.70388 8.92506 9.88943 10.1106C11.075 11.2961 12.6466 12.0168 14.3186 12.1415C15.9906 12.2662 17.6518 11.7866 19 10.79Z"
        stroke={colors.headingSmall}
        stroke-opacity="0.9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
});
