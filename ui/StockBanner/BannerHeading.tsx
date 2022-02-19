import { Ionicons } from '@expo/vector-icons';
import { SymbolGeneralInfo } from '@models';
import { NavigationModal } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { Box, Button, Heading, HStack, Icon, Text, useTheme } from 'native-base';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { SkeletonBannerHeading } from 'ui/Skeletons/SkeletonStockBanner/SkeletonBannerHeading';

type Props = {
  symbolInfo: SymbolGeneralInfo | undefined;
};

export const BannerHeading = memo<Props>(({ symbolInfo }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const openModalHandler = () => {
    dispatch(modalActions.openModal(NavigationModal.Notify));
  };
  const up = (symbolInfo?.regularMarketChange ?? 0) > 0;

  if (symbolInfo) {
    return (
      <Box mb={8}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Heading mr={2} color={colors.heading}>
              {symbolInfo?.regularMarketPrice.toFixed(2)}
            </Heading>
            <Text color={up ? colors.upTextColor : colors.downTextColor} fontSize={'xl'}>
              {up ? `+${symbolInfo?.regularMarketChange.toFixed(2)}` : symbolInfo?.regularMarketChange.toFixed(2)}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Button
              onPress={openModalHandler}
              variant="unstyled"
              endIcon={<Icon as={Ionicons} name="ios-add" size={7} color={colors.upTextColor} />}
            ></Button>
          </HStack>
        </HStack>
        <Text fontSize={'sm'} color={colors.textGray}>
          {symbolInfo?.fullExchangeName}
        </Text>
      </Box>
    );
  } else {
    return <SkeletonBannerHeading />;
  }
});
