import React from 'react';
import { Box } from 'native-base';
import { StockHeader } from '../components/StockHeader';
import { NavigationStackProp } from 'react-navigation-stack';

interface StockScreenProps {
  navigation: NavigationStackProp;
}

export const StockScreen = ({ navigation }: StockScreenProps) => {
  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <Box>
      <StockHeader onPressBack={onPressBack} />
    </Box>
  );
};
