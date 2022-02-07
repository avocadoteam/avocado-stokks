import React, { memo } from 'react';
import { Box } from 'native-base';
import { SkeletonBannerHeading } from './SkeletonStockBanner/SkeletonBannerHeading';
import { SkeletonStockGraph } from './SkeletonStockBanner/SkeletonStockGraph';
import { SkeletonRegularMarketBanner } from './SkeletonStockBanner/SkeletonRegularMarketBanner';
import { SkeletonPopularTweetsBanner } from './SkeletonStockBanner/SkeletonPopularTweetsBanner';
import { SkeletonLatestNewsBanner } from './SkeletonStockBanner/SkeletonLatestNewsBanner';

type Props = {
};

export const SkeletonStockScreen = memo<Props>(({ }) => {

    return (
        <Box>
            <SkeletonBannerHeading />
            <SkeletonStockGraph />
            <SkeletonRegularMarketBanner />
            <SkeletonPopularTweetsBanner />
            <SkeletonLatestNewsBanner />
        </Box>
    )
});
