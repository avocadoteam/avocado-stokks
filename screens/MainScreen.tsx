import { If } from 'ui/atoms/If';
import { MainHeader } from 'ui/MainHeader';
import { Stock } from 'ui/Stock';
import { isDev } from 'core/constants';
import { clearStorageInDev } from 'core/modules/auth/auth-flow';
import { getToken } from 'core/modules/auth/selectors';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import { Box, ScrollView, useTheme, Button } from 'native-base';
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
        <If is={isDev}>
          <Button onPress={clearStorageInDev}>clear storage</Button>
        </If>
      </ScrollView>
    </Box>
  );
});
