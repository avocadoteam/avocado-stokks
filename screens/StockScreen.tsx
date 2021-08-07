import React from 'react';
import { Box, ScrollView, useTheme } from 'native-base';
import { StockHeader } from '../ui/StockHeader';
import { StockBanner } from '../ui/StockBanner';
import { NavigationStackProp } from 'react-navigation-stack';

interface StockScreenProps {
  navigation: NavigationStackProp;
}

export const StockScreen = ({ navigation }: StockScreenProps) => {
  const { colors } = useTheme();
  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <StockHeader onPressBack={onPressBack} />
      <ScrollView>
        <StockBanner />
      </ScrollView>
    </Box>
  );
};
