import { getUserId, shouldSkipAuthQuery } from 'core/modules/auth/selectors';
import { useGetNotificationQuery } from 'core/modules/notifications/query';
import { notificationActions } from 'core/modules/notifications/reducer';
import { useSymbolInfoQuery } from 'core/modules/stock/query';
import { stockActions } from 'core/modules/stock/reducer';
import { getGraphTouched, getSelectedSymbol } from 'core/modules/stock/selectors';
import { useGetUserStoreQuery } from 'core/modules/user/query';
import { Box, ScrollView, useTheme } from 'native-base';
import React, { memo, useEffect, useMemo } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { LoginModal } from 'ui/LoginModal';
import { NotifyModal } from 'ui/NotifyModal/NotifyModal';
import { ErrorSnackbar } from 'ui/Snackbars/ErrorSnackbar';
import { SubscribedSnackbar } from 'ui/Snackbars/SubscribedSnackbar';
import { UnsubscribedSnackbar } from 'ui/Snackbars/UnsubscribedSnackbar';
import { BannerHeading } from 'ui/StockBanner/BannerHeading';
import { LatestNewsBanner } from 'ui/StockBanner/LatestNewsBanner';
import { PopularTweetsBanner } from 'ui/StockBanner/PopularTweetsBanner';
import { RegularMarketBanner } from 'ui/StockBanner/RegularMarketBanner';
import { StockGraph } from 'ui/StockBanner/StockGraph';
import { StockHeader } from 'ui/StockHeader';

type Props = {
  navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const symbol = useSelector(getSelectedSymbol);
  const userId = useSelector(getUserId);
  const skip = useSelector(shouldSkipAuthQuery);
  const symbolInfo = useSymbolInfoQuery({ symbol }, { skip: !symbol }).data;
  const { data: stokks } = useGetUserStoreQuery(undefined, { skip });

  const isStokkInUserStore = useMemo(() => !!stokks?.some(s => s.symbol === symbol), [stokks, symbol]);
  const isGraphTouched = useSelector(getGraphTouched);

  const dispatch = useDispatch();
  const notification = useGetNotificationQuery(
    { symbolId: symbolInfo?.symbolId ?? '', userId },
    { skip: !symbolInfo?.symbolId || skip },
  );

  useEffect(() => {
    return () => {
      dispatch(stockActions.selectSymbol(''));
    };
  }, []);

  useEffect(() => {
    notification.refetch();
  }, [symbol, isStokkInUserStore]);

  useEffect(() => {
    if (notification.data?.id) {
      dispatch(notificationActions.setNotification(notification.data));
    } else {
      dispatch(notificationActions.setNotifyTriggerValue(String(symbolInfo?.regularMarketPrice.toFixed(2)) ?? '0'));
    }
  }, [notification, symbol]);

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <StockHeader onPressBack={navigation.goBack} />
      <ScrollView scrollEnabled={!isGraphTouched}>
        <Box px={6} paddingBottom={6}>
          <BannerHeading isStokkInUserStore={isStokkInUserStore} symbol={symbol} symbolInfo={symbolInfo} />
          <StockGraph />
          <RegularMarketBanner data={symbolInfo} />
          <PopularTweetsBanner symbol={symbol} />
          <LatestNewsBanner symbol={symbol} />
        </Box>
      </ScrollView>
      <SubscribedSnackbar />
      <UnsubscribedSnackbar />
      <ErrorSnackbar />
      <NotifyModal />
      <LoginModal />
    </Box>
  );
});
