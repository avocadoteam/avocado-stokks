import { Box, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Toggle } from 'ui/atoms/Toggle';

export const Header = memo(({}) => {
  const { colors } = useTheme();

  return (
    <Box style={styles.p24}>
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
  p24: {
    paddingRight: 24,
  },
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
