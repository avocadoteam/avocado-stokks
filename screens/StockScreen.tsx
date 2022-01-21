import { Box, ScrollView, useTheme } from 'native-base';
import React, { memo } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { useSymbolInfoQuery } from 'core/modules/stock/query';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { BannerHeading } from 'ui/StockBanner/BannerHeading';
import { StockGraph } from 'ui/StockBanner/StockGraph';
import { StockHeader } from 'ui/StockHeader';
import { RegularMarketBanner } from 'ui/StockBanner/RegularMarketBanner';
import { PopularTweetsBanner } from 'ui/StockBanner/PopularTweetsBanner';

type Props = {
  navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const symbol = useSelector(getSelectedSymbol);
  const { data } = useSymbolInfoQuery({ symbol }, { skip: !symbol });
  const up = (data?.regularMarketChange ?? 0) > 0;

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <StockHeader onPressBack={onPressBack} />
      <ScrollView>
        <Box px={6}>
          <BannerHeading data={data} />
          <StockGraph up={up} />
          <RegularMarketBanner data={data} />
          <PopularTweetsBanner data={data} />
        </Box>
      </ScrollView>
    </Box>
  );
});
