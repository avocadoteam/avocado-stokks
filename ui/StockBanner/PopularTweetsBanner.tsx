import React from 'react';
import { StyleSheet } from 'react-native';
import { Heading, useTheme, ScrollView, Box } from 'native-base';
import { useTweetsQuery } from 'core/modules/stock/query';
import { PopularTweet } from 'ui/PopularTweet';
import { If } from 'ui/atoms/If';
import { SkeletonPopularTweetsBanner } from 'ui/Skeletons/SkeletonStockBanner/SkeletonPopularTweetsBanner';

type PopularTweetsBannerProps = {
  symbol: string;
};

export const PopularTweetsBanner = React.memo<PopularTweetsBannerProps>(({ symbol }) => {
  const { colors } = useTheme();
  const tweets = useTweetsQuery({ query: symbol }, { skip: !symbol }).data;
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
