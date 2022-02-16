import React from 'react';
import { Box, useTheme } from 'native-base';

type SeparatorProps = {
  height?: number | string;
  width?: number | string;
};

export const Separator = React.memo<SeparatorProps>(({ height, width }) => {
  const { colors } = useTheme();

  return (
    <Box
      style={{
        backgroundColor: colors.separator,
        width: width ? width : '100%',
        height: height ? height : 1,
      }}
    />
  );
});
