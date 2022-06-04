import { Box, ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SkeletonBox } from '../SkeletonBox';
import { SkeletonPopularTweet } from '../SkeletonPopularTweet';

export const SkeletonPopularTweetsBanner = React.memo(({}) => {
  return (
    <Box>
      <SkeletonBox marginBottom={27} marginTop={27} width={122} height={20} />
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.mainBox}>
        {[1, 2, 3, 4, 5].map(t => (
          <Box key={`skeletonTweet${t}`} mx={2}>
            <SkeletonPopularTweet />
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
});

const styles = StyleSheet.create({
  mainBox: {
    height: 254,
  },
});
