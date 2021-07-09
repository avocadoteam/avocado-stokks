import React from 'react';
import { Box, useTheme, ScrollView } from 'native-base';
import { MainHeader } from '../components/MainHeader';
import { Stock } from '../components/Stock';

export const MainScreen = () => {
  const { colors } = useTheme();

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader />
      <ScrollView>
        <Stock up={false} />
        <Stock up={true} />
      </ScrollView>
    </Box>
  );
};
