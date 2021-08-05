import { MainHeader } from 'components/MainHeader';
import { Stock } from 'components/Stock';
import { getToken } from 'core/modules/auth/selectors';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import { Box, ScrollView, useTheme } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

interface MainScreenProps {
  navigation: NavigationStackProp;
}

export const MainScreen = React.memo<MainScreenProps>(({ navigation }) => {
  const { colors } = useTheme();
  const token = useSelector(getToken);
  const info = useGetImgFromArticleQuery(
    {
      link: 'https://finance.yahoo.com/news/foot-locker-buy-two-retailers-102155612.html',
    },
    { skip: !token },
  );

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
