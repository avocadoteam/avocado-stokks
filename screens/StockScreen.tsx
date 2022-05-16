import React, { memo, useEffect, useMemo } from 'react';
import { Box, ScrollView, useTheme } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSymbolInfoQuery } from 'core/modules/stock/query';
import { getSelectedSymbol, getGraphTouched } from 'core/modules/stock/selectors';
import { BannerHeading } from 'ui/StockBanner/BannerHeading';
import { StockGraph } from 'ui/StockBanner/StockGraph';
import { StockHeader } from 'ui/StockHeader';
import { RegularMarketBanner } from 'ui/StockBanner/RegularMarketBanner';
import { PopularTweetsBanner } from 'ui/StockBanner/PopularTweetsBanner';
import { LatestNewsBanner } from 'ui/StockBanner/LatestNewsBanner';
import { NotifyModal } from 'ui/NotifyModal/NotifyModal';
import { getUserId } from 'core/modules/auth/selectors';
import { useGetNotificationQuery } from 'core/modules/notifications/query';
import { notificationActions } from 'core/modules/notifications/reducer';
import { SubscribedSnackbar } from 'ui/Snackbars/SubscribedSnackbar';
import { UnsubscribedSnackbar } from 'ui/Snackbars/UnsubscribedSnackbar';
import { ErrorSnackbar } from 'ui/Snackbars/ErrorSnackbar';
import { getUserStoreData } from 'core/modules/user/selectors';

type Props = {
  navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const symbol = useSelector(getSelectedSymbol);
  const symbolInfo = useSymbolInfoQuery({ symbol }, { skip: !symbol }).data;
  const up = (symbolInfo?.regularMarketChange ?? 0) > 0;
  const stokks = useSelector(getUserStoreData);
  const isStokkInUserStore = useMemo(() => stokks.some(s => s.symbol === symbol), [stokks, symbol]);
  const isGraphTouched = useSelector(getGraphTouched);

  const onPressBack = () => {
    navigation.goBack();
  };

  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const notification = useGetNotificationQuery(
    { symbolId: symbolInfo?.symbolId ?? '', userId },
    { skip: !symbolInfo?.symbolId },
  );

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
      <StockHeader onPressBack={onPressBack} />
      <ScrollView scrollEnabled={!isGraphTouched}>
        <Box px={6} paddingBottom={6}>
          <BannerHeading isStokkInUserStore={isStokkInUserStore} symbol={symbol} userId={userId} symbolInfo={symbolInfo} />
          <StockGraph up={up} />
          <RegularMarketBanner data={symbolInfo} />
          <PopularTweetsBanner symbol={symbol} />
          <LatestNewsBanner symbol={symbol} />
          <NotifyModal />
        </Box>
      </ScrollView>
      <SubscribedSnackbar />
      <UnsubscribedSnackbar />
      <ErrorSnackbar />
    </Box>
  );
});
