import { isDev } from 'core/constants';
import { clearStorageInDev } from 'core/modules/auth/auth-flow';
import { getUserId } from 'core/modules/auth/selectors';
import { useGetTrendingSumbolsQuery } from 'core/modules/stock/query';
import { useGetUserStoreQuery } from 'core/modules/user/query';
import { Box, Button, ScrollView, Text, useTheme } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { If } from 'ui/atoms/If';
import { MainHeader } from 'ui/MainHeader';
import { Stock } from 'ui/Stock';

interface MainScreenProps {
  navigation: NavigationStackProp;
}

export const MainScreen = React.memo<MainScreenProps>(({ navigation }) => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const userStore = useGetUserStoreQuery(
    {
      userId,
    },
    { skip: !userId },
  );

  const trendingSymbols = useGetTrendingSumbolsQuery(
    { count: 8 },
    { skip: !!userStore.data?.length || !userStore.isSuccess },
  );

  const onPressStock = () => {
    navigation.navigate('StockScreen');
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader showWelcome={trendingSymbols.isSuccess} />
      <If is={trendingSymbols.isSuccess}>
        <Box marginX="24px" marginBottom="24px">
          <Text>Add companies to your tracking list to get started.</Text>
        </Box>
      </If>
      <ScrollView>
        <If is={trendingSymbols.isSuccess && !!trendingSymbols.data.length}>
          {trendingSymbols.data?.map(ts => (
            <Stock onPress={onPressStock} key={ts.symbol} data={ts} />
          ))}
        </If>

        <If is={userStore.isSuccess && !!userStore.data.length}>
          {userStore.data?.map(ts => (
            <Stock onPress={onPressStock} key={ts.symbol} data={ts} withGraph />
          ))}
        </If>

        <If is={isDev}>
          <Button onPress={clearStorageInDev}>clear storage</Button>
        </If>
      </ScrollView>
    </Box>
  );
});
