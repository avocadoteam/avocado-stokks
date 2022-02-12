import React from 'react';
import { Heading, useTheme, Box } from 'native-base';
import { useNewsItemsQuery } from 'core/modules/stock/query';
import { MainNewsItem } from 'ui/MainNewsItem';
import { FeedNewsItems } from 'ui/FeedNewsItems';
import { If } from 'ui/atoms/If';
import { SkeletonLatestNewsBanner } from 'ui/Skeletons/SkeletonStockBanner/SkeletonLatestNewsBanner';

type LatestNewsBannerProps = {
  data: { symbol: string };
};

export const LatestNewsBanner = React.memo<LatestNewsBannerProps>(({ data: { symbol } }) => {
  const { colors } = useTheme();
  const newsItems = useNewsItemsQuery({ query: symbol }, { skip: !symbol }).data;
  const mainNewsItem = newsItems && newsItems[0] && <MainNewsItem data={newsItems[0]} />;

  if (Array.isArray(newsItems)) {
    return (
      <Box>
        <If is={!!newsItems?.length}>
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
      </Box>
    );
  } else {
    return <SkeletonLatestNewsBanner />;
  }
});
