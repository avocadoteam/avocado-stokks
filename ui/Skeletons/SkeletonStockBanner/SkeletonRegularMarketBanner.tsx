import React, { useMemo } from 'react';
import { Box, Flex } from 'native-base';
import { StyleSheet } from 'react-native';
import { SkeletonBox } from '../SkeletonBox';

export const SkeletonRegularMarketBanner = React.memo(({}) => {
  return (
    <Flex marginTop={8} direction="row" style={styles.mainBox}>
      <Box style={styles.leftSide}>
        <SkeletonSide />
      </Box>
      <Box style={styles.rightSide}>
        <SkeletonSide />
      </Box>
    </Flex>
  );
});

const styles = StyleSheet.create({
  leftSide: {
    width: '50%',
  },
  rightSide: {
    width: '50%',
  },
  mainBox: {
    width: '100%',
  },
});

const SkeletonSide = React.memo(({}) => {
  const getItems = useMemo(() => {
    let elements = [];
    for (let i = 0; i < 3; i++) {
      elements.push(
        <Box key={i} marginTop={4}>
          <SkeletonBox width={57} height={14} />
          <SkeletonBox width={88} height={18} marginTop={10} />
        </Box>,
      );
    }
    return elements;
  }, []);

  return <>{getItems}</>;
});
