import React, { memo, useState } from 'react';
import { Box, ScrollView, useTheme } from 'native-base';
import { useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { useNewsItemsQuery, useSymbolInfoQuery, useTweetsQuery } from 'core/modules/stock/query';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { BannerHeading } from 'ui/StockBanner/BannerHeading';
import { StockGraph } from 'ui/StockBanner/StockGraph';
import { StockHeader } from 'ui/StockHeader';
import { RegularMarketBanner } from 'ui/StockBanner/RegularMarketBanner';
import { PopularTweetsBanner } from 'ui/StockBanner/PopularTweetsBanner';
import { LatestNewsBanner } from 'ui/StockBanner/LatestNewsBanner';
import { NotifyModal } from 'ui/NotifyModal/NotifyModal';
import { SkeletonStockScreen } from 'ui/Skeletons/SkeletonStockScreen';
import { If } from 'ui/atoms/If';

type Props = {
  navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const symbol = useSelector(getSelectedSymbol);
  const symbolInfo = useSymbolInfoQuery({ symbol }, { skip: !symbol }).data;
  const tweets = useTweetsQuery({ query: symbol }, { skip: !symbol }).data
  const newsItems = useNewsItemsQuery({ query: symbol }, { skip: !symbol }).data
  const up = (symbolInfo?.regularMarketChange ?? 0) > 0;
  const isInit = !!(symbol && symbolInfo && Array.isArray(tweets))

  const [visibleNotifyModal, setVisibleNotifyModal] = useState(false)
  const openNotifyModal = () => {
    setVisibleNotifyModal(true)
  }
  const closeNotifyModal = () => {
    setVisibleNotifyModal(false)
  }

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <StockHeader onPressBack={onPressBack} />
      <ScrollView>
        <Box px={6} paddingBottom={6}>
          <If is={isInit} else={<SkeletonStockScreen />}>
            <BannerHeading data={symbolInfo} openNotifyModal={openNotifyModal} />
            <StockGraph up={up} />
            <RegularMarketBanner data={symbolInfo} />
            <PopularTweetsBanner data={tweets} />
            <LatestNewsBanner data={newsItems} />
            <NotifyModal visible={visibleNotifyModal} closeNotifyModal={closeNotifyModal} />
          </If>
        </Box>
      </ScrollView>
    </Box>
  );
});
