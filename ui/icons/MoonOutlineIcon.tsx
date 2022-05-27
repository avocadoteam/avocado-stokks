import { useTheme } from 'native-base';
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const MoonOutlineIcon = memo(() => {
  const { colors } = useTheme();
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M19 10.79C18.8427 12.4922 18.2039 14.1144 17.1582 15.4668C16.1126 16.8192 14.7035 17.8458 13.0957 18.4265C11.4879 19.0073 9.74798 19.1181 8.07949 18.7461C6.41101 18.3741 4.88299 17.5345 3.67422 16.3258C2.46545 15.117 1.62593 13.589 1.2539 11.9205C0.881868 10.252 0.992709 8.51208 1.57345 6.9043C2.1542 5.29651 3.18082 3.88737 4.53321 2.84175C5.88559 1.79614 7.50779 1.15731 9.20999 1C8.21341 2.34827 7.73384 4.00945 7.85852 5.68141C7.98321 7.35338 8.70385 8.92506 9.88939 10.1106C11.0749 11.2961 12.6466 12.0168 14.3186 12.1415C15.9905 12.2662 17.6517 11.7866 19 10.79Z"
        stroke={colors.headingSmall}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
