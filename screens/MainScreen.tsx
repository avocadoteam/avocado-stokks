import { NavigationScreen } from 'core/models';
import { shouldSkipAuthQuery } from 'core/modules/auth/selectors';
import { useGetTrendingSumbolsQuery } from 'core/modules/stock/query';
import { stockActions } from 'core/modules/stock/reducer';
import { useGetUserStoreQuery } from 'core/modules/user/query';
import { Box, ScrollView, Text, useTheme } from 'native-base';
import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { If } from 'ui/atoms/If';
import { InfoModal } from 'ui/InfoModal';
import { LoginModal } from 'ui/LoginModal';
import { MainHeader } from 'ui/MainHeader';
import { SkeletonUserStocks } from 'ui/Skeletons/SkeletonUserStocks';
import { SwipeDeleteStock } from 'ui/SwipeDeleteStock';
import { TrendingStock } from 'ui/TrendingStock';
import { UserStock } from 'ui/UserStock';

type Props = {
  navigation: NavigationStackProp;
};

export const MainScreen = React.memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const skip = useSelector(shouldSkipAuthQuery);
  const { data, isFetching } = useGetUserStoreQuery(undefined, { skip });

  const trendingSymbols = useGetTrendingSumbolsQuery({ count: 120 });

  const onPressStock = useCallback((symbol: string) => {
    dispatch(stockActions.selectSymbol(symbol));
    navigation.navigate(NavigationScreen.Stock);
  }, []);

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader showWelcome={trendingSymbols.isSuccess && skip} />
      <If is={trendingSymbols.isSuccess && skip}>
        <Box marginX="24px" marginBottom="24px">
          <Text color={colors.textGray}>Add companies to your tracking list to get started.</Text>
        </Box>
      </If>
      <ScrollView>
        <If is={trendingSymbols.isSuccess && !!trendingSymbols.data.length && (skip || !data?.length)}>
          {trendingSymbols.data?.map(ts => (
            <TrendingStock onPress={onPressStock} key={ts.symbol} data={ts} />
          ))}
        </If>

        {data?.map(ts => (
          <SwipeDeleteStock key={ts.symbol} symbolId={ts.symbolId}>
            <UserStock onPress={onPressStock} data={ts} />
          </SwipeDeleteStock>
        ))}
        {isFetching && !data?.length && <SkeletonUserStocks />}
      </ScrollView>
      <InfoModal />
      <LoginModal />
    </Box>
  );
});
