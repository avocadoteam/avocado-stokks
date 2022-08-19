import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YahooSearchResult } from '@models';
import { NavigationModal } from 'core/models';
import { shouldSkipAuthQuery } from 'core/modules/auth/selectors';
import { modalActions } from 'core/modules/modal/reducer';
import { stockActions } from 'core/modules/stock/reducer';
import { useAddToUserStoreMutation, useGetUserStoreQuery } from 'core/modules/user/query';
import { Box, Button, Heading, HStack, Icon, Text, useTheme } from 'native-base';
import React, { useCallback, useMemo } from 'react';
import { Text as NativeText, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { If } from './atoms/If';

interface StockProps {
  onPress: (symbol: string) => void;
  data: YahooSearchResult;
}

export const TrendingStock = React.memo<StockProps>(({ onPress, data }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [addToStore, { isLoading }] = useAddToUserStoreMutation();
  const { data: stokks } = useGetUserStoreQuery();
  const skip = useSelector(shouldSkipAuthQuery);
  const isStokkInUserStore = useMemo(() => !!stokks?.some(s => s.symbol === data.symbol), [stokks]);

  const onAdd = useCallback(() => {
    if (skip) {
      dispatch(stockActions.setStockToBeAdded(data.symbol));
      dispatch(modalActions.openModal(NavigationModal.Login));
    } else {
      addToStore({ symbol: data.symbol });
    }
  }, [data.symbol, skip]);

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
        <If is={!isStokkInUserStore}>
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
        </If>
      </HStack>
    </TouchableHighlight>
  );
});
