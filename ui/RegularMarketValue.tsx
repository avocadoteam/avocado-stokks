import { Box, Heading, useTheme } from 'native-base';
import React from 'react';
import { Text as NativeText } from 'react-native';

type RegularMarketProps = {
  my?: number;
  title: string;
  value: number | string;
};

export const RegularMarketValue = React.memo<RegularMarketProps>(({ my, title, value }) => {
  const { colors } = useTheme();

  return (
    <Box my={my}>
      <NativeText
        style={{
          color: colors.textGray,
        }}
        numberOfLines={1}
      >
        {title}
      </NativeText>
      <Heading mt={1} size={'sm'} color={colors.headingSmall} textTransform={'uppercase'}>
        {value}
      </Heading>
    </Box>
  );
});
