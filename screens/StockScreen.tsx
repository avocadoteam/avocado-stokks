import React, { memo, useEffect } from 'react';
import { Box, ScrollView, useTheme } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSymbolInfoQuery } from 'core/modules/stock/query';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
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
import { getVisibleModal } from 'core/modules/modal/selectors';

type Props = {
  navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const isNotifyModalOpen = useSelector(getVisibleModal)
  const symbol = useSelector(getSelectedSymbol);
  const symbolInfo = useSymbolInfoQuery({ symbol }, { skip: !symbol }).data;
  const up = (symbolInfo?.regularMarketChange ?? 0) > 0;

  const onPressBack = () => {
    navigation.goBack();
  };

  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const notification = useGetNotificationQuery({ symbolId: symbolInfo?.symbolId ?? "", userId }, { skip: !symbolInfo }).data
  useEffect(() => {
    console.log(notification);
    if (notification) {
      dispatch(notificationActions.setNotification(notification))
    } else {
      dispatch(notificationActions.setNotifyTriggerValue(String(symbolInfo?.regularMarketPrice) ?? "0"))
    }
  }, [notification, isNotifyModalOpen])

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <StockHeader onPressBack={onPressBack} />
      <ScrollView>
        <Box px={6} paddingBottom={6}>
          <BannerHeading symbolInfo={symbolInfo} />
          <StockGraph up={up} />
          <RegularMarketBanner data={symbolInfo} />
          <PopularTweetsBanner symbol={symbol} />
          <LatestNewsBanner symbol={symbol} />
          <NotifyModal />
        </Box>
      </ScrollView>
    </Box>
  );
});
