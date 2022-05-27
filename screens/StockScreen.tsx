import { Box, ScrollView, useTheme } from 'native-base';
import React, { memo, useEffect, useMemo } from 'react';
import { getGraphTouched, getSelectedSymbol } from 'core/modules/stock/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { BannerHeading } from 'ui/StockBanner/BannerHeading';
import { ErrorSnackbar } from 'ui/Snackbars/ErrorSnackbar';
import { LatestNewsBanner } from 'ui/StockBanner/LatestNewsBanner';
import { NavigationStackProp } from 'react-navigation-stack';
import { NotifyModal } from 'ui/NotifyModal/NotifyModal';
import { PopularTweetsBanner } from 'ui/StockBanner/PopularTweetsBanner';
import { RegularMarketBanner } from 'ui/StockBanner/RegularMarketBanner';
import { StockGraph } from 'ui/StockBanner/StockGraph';
import { StockHeader } from 'ui/StockHeader';
import { SubscribedSnackbar } from 'ui/Snackbars/SubscribedSnackbar';
import { UnsubscribedSnackbar } from 'ui/Snackbars/UnsubscribedSnackbar';
import { getUserId } from 'core/modules/auth/selectors';
import { notificationActions } from 'core/modules/notifications/reducer';
import { stockActions } from 'core/modules/stock/reducer';
import { useGetNotificationQuery } from 'core/modules/notifications/query';
import { useGetUserStoreQuery } from 'core/modules/user/query';
import { useSymbolInfoQuery } from 'core/modules/stock/query';

type Props = {
  navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const symbol = useSelector(getSelectedSymbol);
  const userId = useSelector(getUserId);
  const symbolInfo = useSymbolInfoQuery({ symbol }, { skip: !symbol || !userId }).data;
  const { data: stokks } = useGetUserStoreQuery(undefined, { skip: !userId });

  const isStokkInUserStore = useMemo(() => !!stokks?.some(s => s.symbol === symbol), [stokks, symbol]);
  const isGraphTouched = useSelector(getGraphTouched);

  const dispatch = useDispatch();
  const notification = useGetNotificationQuery(
    { symbolId: symbolInfo?.symbolId ?? '', userId },
    { skip: !symbolInfo?.symbolId || !userId },
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
    </Box>
  );
});
