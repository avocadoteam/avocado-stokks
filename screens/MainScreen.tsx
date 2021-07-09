import React from 'react';
import { Box, useTheme } from 'native-base';
import { MainHeader } from '../components/MainHeader';

export const MainScreen = () => {
  const { colors } = useTheme();

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader />
    </Box>
  );
};
