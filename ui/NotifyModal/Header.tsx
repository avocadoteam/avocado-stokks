import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';

import { StyleSheet } from 'react-native';
import { Toggle } from 'ui/atoms/Toggle';

export const Header = memo(({}) => {
  const { colors } = useTheme();

  return (
    <Box>
      <Toggle />
      <Box style={styles.header}>
        <Heading color={colors.headingSmall} size={'sm'}>
          Notify when
        </Heading>
      </Box>
    </Box>
  );
});

const styles = StyleSheet.create({
  swipeController: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 24,
  },
  header: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
