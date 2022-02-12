import { Ionicons } from '@expo/vector-icons';
import { SymbolGeneralInfo } from '@models';
import { openNotifyModal } from 'core/modules/stock/reducer';
import { Box, Button, Heading, HStack, Icon, Text, useTheme } from 'native-base';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { SkeletonBannerHeading } from 'ui/Skeletons/SkeletonStockBanner/SkeletonBannerHeading';

type Props = {
  data: SymbolGeneralInfo | undefined;
};

export const BannerHeading = memo<Props>(({ data }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch()
  const handlerOpenNotifyModal = () => {
    dispatch(openNotifyModal())
  }
  const up = (data?.regularMarketChange ?? 0) > 0;

  if (data) {
    return (
      <Box mb={8}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Heading mr={2} color={colors.heading}>
              {data?.regularMarketPrice.toFixed(2)}
            </Heading>
            <Text color={up ? colors.upTextColor : colors.downTextColor} fontSize={'xl'}>
              {up ? `+${data?.regularMarketChange.toFixed(2)}` : data?.regularMarketChange.toFixed(2)}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Button
              onPress={handlerOpenNotifyModal}
              variant="unstyled"
              endIcon={<Icon as={Ionicons} name="ios-add" size={7} color={colors.upTextColor} />}
            ></Button>
          </HStack>
        </HStack>
        <Text fontSize={'sm'} color={colors.textGray}>
          {data?.fullExchangeName}
        </Text>
      </Box >
    );
  } else {
    return <SkeletonBannerHeading />
  }
});
