import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Flex } from 'native-base';
import { SkeletonBox } from './SkeletonBox';

export const SkeletonNewsItem = React.memo(({}) => {
  return (
    <Flex direction="row">
      <Flex style={styles.infoBox} direction="column">
        <SkeletonBox width={117} height={14} />
        <SkeletonBox width={196} height={16} marginTop={10} />
        <SkeletonBox width={65} height={14} marginTop={10} />
      </Flex>
      <Box style={styles.imageBox}>
        <SkeletonBox width={60} height={60} borderRadius={14} />
      </Box>
    </Flex>
  );
});

const styles = StyleSheet.create({
  infoBox: {
    width: 250,
    height: 107,
    justifyContent: 'center',
  },
  imageBox: {
    height: 107,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
