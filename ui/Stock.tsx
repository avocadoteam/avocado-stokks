import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YahooSearchResult } from '@models';
import { getUserId } from 'core/modules/auth/selectors';
import { useAddToUserStoreMutation } from 'core/modules/user/query';
import { Box, Button, Heading, HStack, Icon, Image, Text, useTheme } from 'native-base';
import { Text as NativeText } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
import graphDownSrc from '../assets/images/Graph.png';
import graphUpSrc from '../assets/images/GraphUp.png';
import { If } from './atoms/If';

interface StockProps {
  withGraph?: boolean;
  onPress: () => void;
  data: YahooSearchResult;
}

export const Stock = React.memo<StockProps>(({ onPress, withGraph = false, data }) => {
  const { colors } = useTheme();
  const up = data.regularMarketChange > 0;
  const [addToStore, { isLoading }] = useAddToUserStoreMutation();
  const userId = useSelector(getUserId);

  const onAdd = React.useCallback(() => {
    addToStore({ symbol: data.symbol, userId });
  }, [userId]);

  return (
    <TouchableHighlight onPress={onPress}>
      <HStack alignItems="center" px={6} py="12px" backgroundColor={colors.appBackground}>
        <If is={withGraph}>
          <Box mr={7}>
            <Image alt="stock graph" resizeMode="contain" source={up ? graphUpSrc : graphDownSrc} size={'md'} />
          </Box>
        </If>
        <Box style={{ marginRight: 'auto', width: withGraph ? '55%' : '80%' }}>
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
          <If
            is={withGraph}
            else={
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
            }
          >
            <Text color={colors.textDarkGray} fontSize={'sm'} fontWeight={700} py={1} textAlign="center">
              {data.regularMarketPrice.toFixed(2)}
            </Text>
            <Box bg={up ? colors.upBg : colors.downBg} borderRadius={30} py={1} px={2}>
              <Text textAlign="center" color={up ? colors.upTextColor : colors.downTextColor} fontWeight={700}>
                {data.regularMarketChange.toFixed(2)}
              </Text>
            </Box>
          </If>
        </Box>
      </HStack>
    </TouchableHighlight>
  );
});
