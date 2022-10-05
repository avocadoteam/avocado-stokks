import { Box, useTheme } from 'native-base';
import React, { memo } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ScreenBox = memo<Props>(({ children }) => {
  const { colors } = useTheme();

  return (
    <Box flex={1} backgroundColor={colors.appBackground}>
      {children}
    </Box>
  );
});
