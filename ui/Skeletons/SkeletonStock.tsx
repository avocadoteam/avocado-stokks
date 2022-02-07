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
import { NewsItem } from '@models';
import { SkeletonBannerHeading } from './SkeletonStockBanner/SkeletonBannerHeading';
import { SkeletonStockGraph } from './SkeletonStockBanner/SkeletonStockGraph';
import { SkeletonRegularMarketBanner } from './SkeletonStockBanner/SkeletonRegularMarketBanner';

type Props = {
    navigation: NavigationStackProp;
};

export const StockScreen = memo<Props>(({ navigation }) => {
    const { colors } = useTheme()

    const onPressBack = () => {
        navigation.goBack();
    };

    return (
        <Box backgroundColor={colors.appBackground} flex={1}>
            <StockHeader onPressBack={onPressBack} />
            <ScrollView>
                <Box px={6} paddingBottom={6}>
                    <SkeletonBannerHeading />
                    <SkeletonStockGraph />
                    <SkeletonRegularMarketBanner />
                    <PopularTweetsBanner data={tweets} />
                    <LatestNewsBanner data={newsItems} />
                    <NotifyModal visible={visibleNotifyModal} closeNotifyModal={closeNotifyModal} />
                </Box>
            </ScrollView>
        </Box>
    );
});
