import { UserStoreItem } from '@models';
import { Box, Heading, HStack, Text, useTheme } from 'native-base';
import React from 'react';
import { Text as NativeText, TouchableHighlight } from 'react-native';
import { AreaGraph } from './graphs/AreaChart';

interface StockProps {
  onPress: () => void;
  data: UserStoreItem;
}

export const UserStock = React.memo<StockProps>(({ onPress, data }) => {
  const { colors } = useTheme();
  const up = data.regularMarketChange > 0;
  const graphData = data.history.map(h => h.close);

  return (
    <TouchableHighlight onPress={onPress}>
      <HStack alignItems="center" px={6} py="12px" backgroundColor={colors.appBackground}>
        <Box mr={7}>
          <AreaGraph data={graphData} up={up} />
        </Box>
        <Box style={{ marginRight: 'auto', width: '55%' }}>
          <Heading size={'sm'} color={colors.headingSmall} textTransform={'uppercase'}>
            {data.symbol}
          </Heading>
          <NativeText
            style={{
              color: colors.textGray,
            }}
            numberOfLines={1}
          >
            {data.shortname}
          </NativeText>
        </Box>
        <Box>
          <Text color={colors.textDarkGray} fontSize={'sm'} fontWeight={700} py={1} textAlign="center">
            {data.regularMarketPrice.toFixed(2)}
          </Text>
          <Box bg={up ? colors.upBg : colors.downBg} borderRadius={30} py={1} px={2}>
            <Text textAlign="center" color={up ? colors.upTextColor : colors.downTextColor} fontWeight={700}>
              {data.regularMarketChange.toFixed(2)}
            </Text>
          </Box>
        </Box>
      </HStack>
    </TouchableHighlight>
  );
});
