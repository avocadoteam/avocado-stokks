import React from 'react';
import { HStack, Box, Heading, Text, Icon, useTheme, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const BannerHeading = () => {
  const { colors } = useTheme();

  return (
    <Box mb={8}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <Heading mr={2} color={colors.heading}>
            1234,4
          </Heading>
          <Text color={colors.primary} fontSize={'xl'}>
            + 37,6
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Button
            variant="unstyled"
            endIcon={<Icon as={Ionicons} name="ios-add" size={7} color={colors.upTextColor} />}
          ></Button>
        </HStack>
      </HStack>
      <Text fontSize={'sm'} color={colors.textGray}>
        Nasdaq, Inc.
      </Text>
    </Box>
  );
};
