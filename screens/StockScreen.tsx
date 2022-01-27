import { Box, ScrollView, useTheme } from 'native-base';
import React, { memo, useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { useNewsItemsQuery, useSymbolInfoQuery, useTweetsQuery } from 'core/modules/stock/query';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { BannerHeading } from 'ui/StockBanner/BannerHeading';
import { StockGraph } from 'ui/StockBanner/StockGraph';
import { StockHeader } from 'ui/StockHeader';
import { RegularMarketBanner } from 'ui/StockBanner/RegularMarketBanner';
import { PopularTweetsBanner } from 'ui/StockBanner/PopularTweetsBanner';
import { LatestNewsBanner } from 'ui/StockBanner/LatestNewsBanner';
import { NotifyModal } from 'ui/StockBanner/NotifyModal';

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
  const [notifyModalIsOpen, setNotifyModal] = useState(false)

  const openNotifyModal = () => {
    setNotifyModal(true)
  }
  const closeNotifyModal = () => {
    setNotifyModal(false)
  }

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <StockHeader onPressBack={onPressBack} />
      <ScrollView>
        <Box px={6}>
          <BannerHeading data={symbolInfo} openNotifyModal={openNotifyModal} />
          <StockGraph up={up} />
          <RegularMarketBanner data={symbolInfo} />
          <PopularTweetsBanner data={tweets} />
          <LatestNewsBanner data={newsItems} />
          <NotifyModal isOpen={notifyModalIsOpen} closeNotifyModal={closeNotifyModal} />
        </Box>
      </ScrollView>
    </Box>
  );
});
