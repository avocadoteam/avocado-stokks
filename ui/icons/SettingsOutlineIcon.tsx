import { useTheme } from 'native-base';
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const SettingsOutlineIcon = memo(() => {
  const { colors } = useTheme();
  return (
    <Svg width="24" height="26" viewBox="0 0 24 26" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.1944 7.89619L21.4596 6.60381C20.8379 5.51026 19.4601 5.13301 18.3796 5.76048C17.8653 6.06754 17.2516 6.15466 16.6738 6.00262C16.096 5.85058 15.6016 5.47187 15.2997 4.95C15.1054 4.61829 15.001 4.24047 14.9971 3.85476C15.0146 3.23636 14.7844 2.63711 14.3589 2.19351C13.9334 1.74991 13.3489 1.49975 12.7385 1.5H11.2579C10.6599 1.49999 10.0865 1.74151 9.66466 2.17111C9.2428 2.6007 9.00725 3.18296 9.01012 3.78905C8.9924 5.0404 7.98635 6.04537 6.7515 6.04524C6.37091 6.04123 5.99812 5.93544 5.67082 5.73857C4.59033 5.11111 3.21258 5.48835 2.59088 6.5819L1.80199 7.89619C1.18104 8.98837 1.54821 10.3838 2.6233 11.0176C3.32213 11.4265 3.75263 12.1822 3.75263 13C3.75263 13.8178 3.32213 14.5735 2.6233 14.9824C1.54958 15.6119 1.18201 17.004 1.80199 18.0929L2.54766 19.3962C2.83895 19.9289 3.32768 20.322 3.90571 20.4885C4.48374 20.6549 5.10341 20.5811 5.62759 20.2833C6.1429 19.9786 6.75696 19.8951 7.33329 20.0514C7.90962 20.2077 8.40047 20.5909 8.69672 21.1157C8.89098 21.4474 8.99536 21.8252 8.99931 22.211C8.99931 23.4752 10.0105 24.5 11.2579 24.5H12.7385C13.9817 24.5 14.9911 23.4818 14.9971 22.2219C14.9942 21.6139 15.2312 21.03 15.6554 20.6001C16.0796 20.1702 16.6558 19.9299 17.2557 19.9329C17.6354 19.9432 18.0066 20.0485 18.3364 20.2395C19.4141 20.8688 20.7909 20.4967 21.4163 19.4071L22.1944 18.0929C22.4956 17.5689 22.5783 16.945 22.4241 16.3591C22.2699 15.7732 21.8917 15.2738 21.3731 14.9714C20.8545 14.6691 20.4763 14.1696 20.3221 13.5838C20.1679 12.9979 20.2506 12.3739 20.5518 11.85C20.7476 11.5034 21.0311 11.2161 21.3731 11.0176C22.4417 10.3841 22.8081 8.99687 22.1944 7.90714V7.89619Z"
        stroke={colors.primary[100]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.1158 13C15.1158 14.7421 13.7224 16.1543 12.0035 16.1543C10.2846 16.1543 8.89112 14.7421 8.89112 13C8.89112 11.258 10.2846 9.84574 12.0035 9.84574C13.7224 9.84574 15.1158 11.258 15.1158 13Z"
        stroke={colors.primary[100]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
