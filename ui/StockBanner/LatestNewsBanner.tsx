import { Box, Heading, useTheme } from 'native-base';

import { getUserId } from 'core/modules/auth/selectors';
import { useNewsItemsQuery } from 'core/modules/stock/query';
import React from 'react';
import { useSelector } from 'react-redux';
import { If } from 'ui/atoms/If';
import { FeedNewsItems } from 'ui/FeedNewsItems';
import { MainNewsItem } from 'ui/MainNewsItem';
import { SkeletonLatestNewsBanner } from 'ui/Skeletons/SkeletonStockBanner/SkeletonLatestNewsBanner';

type LatestNewsBannerProps = {
  symbol: string;
};

export const LatestNewsBanner = React.memo<LatestNewsBannerProps>(({ symbol }) => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const newsItems = useNewsItemsQuery({ query: symbol }, { skip: !symbol }).data;
  const mainNewsItem = newsItems && newsItems[0] && <MainNewsItem data={newsItems[0]} />;

  if (Array.isArray(newsItems)) {
    return (
      <If is={!!newsItems.length}>
        <Heading size={'sm'} my={5} mr={2} color={colors.heading}>
          Latest News
        </Heading>
        <Box>
          <Box>{mainNewsItem}</Box>
          <Box my={4}>
            <FeedNewsItems data={newsItems.length > 1 ? [...newsItems].slice(1) : []} />
          </Box>
        </Box>
      </If>
    );
  } else {
    return <SkeletonLatestNewsBanner />;
  }
});
