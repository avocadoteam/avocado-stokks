import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YahooSearchResult } from '@models';
import { getUserId } from 'core/modules/auth/selectors';
import { useAddToUserStoreMutation } from 'core/modules/user/query';
import { Box, Button, Heading, HStack, Icon, Text, useTheme } from 'native-base';
import React, { useCallback } from 'react';
import { Text as NativeText, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';

interface StockProps {
  onPress: (symbol: string) => void;
  data: YahooSearchResult;
}

export const TrendingStock = React.memo<StockProps>(({ onPress, data }) => {
  const { colors } = useTheme();
  const [addToStore, { isLoading }] = useAddToUserStoreMutation();
  const userId = useSelector(getUserId);

  const onAdd = useCallback(() => {
    addToStore({ symbol: data.symbol, userId });
  }, [userId]);

  const touchStock = useCallback(() => {
    onPress(data.symbol);
  }, [onPress, data.symbol]);

  return (
    <TouchableHighlight onPress={touchStock}>
      <HStack alignItems="center" px={6} py="12px" backgroundColor={colors.appBackground}>
        <Box style={{ marginRight: 'auto', width: '80%' }}>
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
          <Button
            backgroundColor={colors.upBg}
            color={colors.upTextColor}
            size="sm"
            rounded={40}
            endIcon={<Icon as={MaterialCommunityIcons} name="plus" size={4} color={colors.upTextColor} />}
            width={74}
            height={38}
            onPress={onAdd}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            <Text color={colors.upTextColor}>Add</Text>
          </Button>
        </Box>
      </HStack>
    </TouchableHighlight>
  );
});
