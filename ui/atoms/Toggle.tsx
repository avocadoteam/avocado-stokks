import React, { memo } from 'react';

import { Box } from 'native-base';
import { Separator } from 'ui/atoms/Separator';
import { StyleSheet } from 'react-native';

type ToggleProps = {
  paddingTop?: number;
};

export const Toggle = memo<ToggleProps>(({ paddingTop }) => {
  return (
    <Box style={{ ...styles.swipeController, paddingTop: paddingTop ?? 24 }}>
      <Separator width={52} height={3} />
    </Box>
  );
});

const styles = StyleSheet.create({
  swipeController: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
