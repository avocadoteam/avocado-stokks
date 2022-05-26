import { Box, Button, ScrollView, Text, useTheme } from 'native-base';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { If } from 'ui/atoms/If';
import { InfoModal } from 'ui/InfoModal';
import { LoginModal } from 'ui/LoginModal';
import { MainHeader } from 'ui/MainHeader';
import { NavigationScreen } from 'core/models';
import { NavigationStackProp } from 'react-navigation-stack';
import { SkeletonUserStocks } from 'ui/Skeletons/SkeletonUserStocks';
import { SwipeDeleteStock } from 'ui/SwipeDeleteStock';
import { TrendingStock } from 'ui/TrendingStock';
import { UserStock } from 'ui/UserStock';
import { clearStorageInDev } from 'core/modules/auth/auth-flow';
import { getUserId } from 'core/modules/auth/selectors';
import { isDev } from 'core/constants';
import { stockActions } from 'core/modules/stock/reducer';
import { useGetTrendingSumbolsQuery } from 'core/modules/stock/query';
import { useGetUserStoreQuery } from 'core/modules/user/query';

type Props = {
  navigation: NavigationStackProp;
};

export const MainScreen = React.memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();
  const userStore = useGetUserStoreQuery(undefined, { skip: !userId });

  const trendingSymbols = useGetTrendingSumbolsQuery(
    { count: 8 },
    { skip: !!userStore.data?.length || !userStore.isSuccess },
  );

  const onPressStock = useCallback((symbol: string) => {
    dispatch(stockActions.selectSymbol(symbol));
    navigation.navigate(NavigationScreen.Stock);
  }, []);

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader showWelcome={trendingSymbols.isSuccess} />
      <If is={trendingSymbols.isSuccess}>
        <Box marginX="24px" marginBottom="24px">
          <Text color={colors.textGray}>Add companies to your tracking list to get started.</Text>
        </Box>
      </If>
      <ScrollView>
        <If is={trendingSymbols.isSuccess && !!trendingSymbols.data.length}>
          {trendingSymbols.data?.map(ts => (
            <TrendingStock onPress={onPressStock} key={ts.symbol} data={ts} />
          ))}
        </If>

        <If is={userStore.isSuccess && !!userStore.data.length}>
          {userStore.data?.map(ts => (
            <SwipeDeleteStock key={ts.symbol} symbolId={ts.symbolId}>
              <UserStock onPress={onPressStock} data={ts} />
            </SwipeDeleteStock>
          ))}
        </If>
        {!Array.isArray(userStore.data) && <SkeletonUserStocks />}
        <If is={isDev}>
          <Button onPress={clearStorageInDev}>clear storage</Button>
        </If>
      </ScrollView>
      <InfoModal />
      <LoginModal />
    </Box>
  );
});
