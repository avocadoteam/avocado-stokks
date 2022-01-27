import { Ionicons } from '@expo/vector-icons';
import { SymbolGeneralInfo } from '@models';
import { Box, Button, Heading, HStack, Icon, Text, useTheme } from 'native-base';
import React, { memo } from 'react';

type Props = {
  data: SymbolGeneralInfo | undefined;
  openNotifyModal: () => void;
};

export const BannerHeading = memo<Props>(({ data, openNotifyModal }) => {
  const { colors } = useTheme();
  const up = (data?.regularMarketChange ?? 0) > 0;

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
            onTouchStart={openNotifyModal}
            variant="unstyled"
            endIcon={<Icon as={Ionicons} name="ios-add" size={7} color={colors.upTextColor} />}
          ></Button>
        </HStack>
      </HStack>
      <Text fontSize={'sm'} color={colors.textGray}>
        {data?.fullExchangeName}
      </Text>
    </Box>
  );
});
