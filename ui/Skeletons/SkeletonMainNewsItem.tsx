import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, useTheme } from 'native-base';
import { SkeletonBox } from './SkeletonBox';

export const SkeletonMainNewsItem = React.memo(({}) => {
  const { colors } = useTheme();

  return (
    <Box style={styles.mainBox} backgroundColor={colors.skeletonMainNewsBg}>
      {[70, 257, 116].map(w => (
        <SkeletonBox marginTop={10} width={w} height={16} bgColor={colors.skeletonMainNewsItem} />
      ))}
    </Box>
  );
});

const styles = StyleSheet.create({
  mainBox: {
    height: 326,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
