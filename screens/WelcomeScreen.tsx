import React from 'react';
import { Box, useTheme, ScrollView, Text } from 'native-base';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { StockNotAdded } from '../components/StockNotAdded';

export const WelcomeScreen = () => {
  const { colors } = useTheme();

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <WelcomeHeader />
      <ScrollView>
        <Text px={6} mb={2} color={colors.textGray}>
          Add companies to your tracking list to get started.
        </Text>
        <StockNotAdded />
        <StockNotAdded />
      </ScrollView>
    </Box>
  );
};
