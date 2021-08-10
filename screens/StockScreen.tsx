import { Box, ScrollView, useTheme } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { StockBanner } from 'ui/StockBanner';
import { StockHeader } from 'ui/StockHeader';

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
