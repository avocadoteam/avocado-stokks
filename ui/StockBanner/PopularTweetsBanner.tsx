import { Box, Heading, ScrollView, useTheme } from 'native-base';

import { If } from 'ui/atoms/If';
import { PopularTweet } from 'ui/PopularTweet';
import React from 'react';
import { SkeletonPopularTweetsBanner } from 'ui/Skeletons/SkeletonStockBanner/SkeletonPopularTweetsBanner';
import { StyleSheet } from 'react-native';
import { getUserId } from 'core/modules/auth/selectors';
import { useSelector } from 'react-redux';
import { useTweetsQuery } from 'core/modules/stock/query';

type PopularTweetsBannerProps = {
  symbol: string;
};

export const PopularTweetsBanner = React.memo<PopularTweetsBannerProps>(({ symbol }) => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const tweets = useTweetsQuery({ query: symbol }, { skip: !symbol || !userId }).data;
  const tweetsJSX =
    tweets?.map(t => (
      <Box mx={2} key={`tweet${t.id}`}>
        <PopularTweet data={t} />
      </Box>
    )) ?? [];

  if (Array.isArray(tweets)) {
    return (
      <Box>
        <If is={!!tweetsJSX.length}>
          <Heading size={'sm'} my={5} mr={2} color={colors.heading}>
            Popular Tweets
          </Heading>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.mainBox}>
            {tweetsJSX}
          </ScrollView>
        </If>
      </Box>
    );
  } else {
    return <SkeletonPopularTweetsBanner />;
  }
});

const styles = StyleSheet.create({
  mainBox: {
    height: 254,
  },
});
