import { getLanguage } from 'core/modules/settings/selector';
import { useTweetsQuery } from 'core/modules/stock/query';
import { Box, Flex, Heading, ScrollView, useTheme } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { If } from 'ui/atoms/If';
import { PopularTweet } from 'ui/PopularTweet';
import { SkeletonPopularTweetsBanner } from 'ui/Skeletons/SkeletonStockBanner/SkeletonPopularTweetsBanner';

type PopularTweetsBannerProps = {
  symbol: string;
};

export const PopularTweetsBanner = React.memo<PopularTweetsBannerProps>(({ symbol }) => {
  const { colors } = useTheme();
  const lang = useSelector(getLanguage);
  const tweets = useTweetsQuery({ query: symbol, lang }, { skip: !symbol }).data;

  if (Array.isArray(tweets)) {
    return (
      <If is={!!tweets.length}>
        <Heading size={'sm'} my={5} mr={2} color={colors.heading}>
          Popular Tweets
        </Heading>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.mainBox}>
          <Flex width={207 * tweets.length + 12 * (tweets.length - 1)} direction="row" justifyContent="space-between">
            {tweets.map(t => (
              <Box key={t.id}>
                <PopularTweet data={t} />
              </Box>
            ))}
          </Flex>
        </ScrollView>
      </If>
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
