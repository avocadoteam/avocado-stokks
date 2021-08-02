import { MainHeader } from 'components/MainHeader';
import { Stock } from 'components/Stock';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import { Box, ScrollView, useTheme } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

interface MainScreenProps {
  navigation: NavigationStackProp;
}

export const MainScreen = React.memo<MainScreenProps>(({ navigation }) => {
  const { colors } = useTheme();
  const info = useGetImgFromArticleQuery({
    link: 'https://finance.yahoo.com/news/foot-locker-buy-two-retailers-102155612.html',
  });

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
