import React from 'react';
import { Box, useTheme, ScrollView } from 'native-base';
import { MainHeader } from '../components/MainHeader';
import { Stock } from '../components/Stock';
import { NavigationStackProp } from 'react-navigation-stack';

interface MainScreenProps {
  navigation: NavigationStackProp;
}

export const MainScreen = React.memo<MainScreenProps>(({ navigation }) => {
  const { colors } = useTheme();

  const onPressStock = () => {
    navigation.navigate('StockScreen');
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader />
      <ScrollView>
        <Stock up={false} onPress={onPressStock} />
      </ScrollView>
    </Box>
  );
});
