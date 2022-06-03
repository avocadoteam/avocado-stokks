import { NavigationScreen } from 'core/models';
import { shouldSkipAuthQuery } from 'core/modules/auth/selectors';
import { useGetTrendingSumbolsQuery } from 'core/modules/stock/query';
import { stockActions } from 'core/modules/stock/reducer';
import { getActiveMainIndex } from 'core/modules/stock/selectors';
import { useGetUserStoreQuery } from 'core/modules/user/query';
import { Box, Heading, ScrollView, Text, useTheme } from 'native-base';
import React, { useCallback } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
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
  const index = useSelector(getActiveMainIndex);
  const { data, isLoading, refetch, isFetching } = useGetUserStoreQuery(undefined, { skip });

  const trendingSymbols = useGetTrendingSumbolsQuery({ count: 120 });

  const onPressStock = useCallback((symbol: string) => {
    dispatch(stockActions.selectSymbol(symbol));
    navigation.navigate(NavigationScreen.Stock);
  }, []);
  const onSwipe = useCallback((index: number) => {
    dispatch(stockActions.setActiveMainScreen(index));
  }, []);

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <MainHeader />

      <Swiper activeDotColor={colors.upTextColor} loop={false} onIndexChanged={onSwipe} index={index}>
        <ScrollView style={styles.view}>
          <If is={trendingSymbols.isSuccess && skip}>
            <Box marginX="24px" marginBottom="24px">
              <Text color={colors.textGray}>Add companies to your tracking list to get started.</Text>
            </Box>
          </If>
          {trendingSymbols.isFetching ? (
            <SkeletonUserStocks />
          ) : (
            trendingSymbols.data?.map(ts => <TrendingStock onPress={onPressStock} key={ts.symbol} data={ts} />)
          )}
        </ScrollView>
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />} style={styles.view}>
          {isLoading ? (
            <SkeletonUserStocks />
          ) : data?.length ? (
            data?.map(ts => (
              <SwipeDeleteStock key={ts.symbol} symbolId={ts.symbolId}>
                <UserStock onPress={onPressStock} data={ts} />
              </SwipeDeleteStock>
            ))
          ) : (
            <Box marginX="24px" marginBottom="24px">
              <Heading color={colors.textGray}>
                {skip ? 'Authorize to get started with stokks' : 'Add at least one stock to your store'}
              </Heading>
            </Box>
          )}
        </ScrollView>
      </Swiper>
      <InfoModal />
      <LoginModal />
    </Box>
  );
});

const styles = StyleSheet.create({
  view: {
    marginBottom: 40,
  },
});
