import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Heading, HStack, Icon, Image, Text, useTheme } from 'native-base';
import React from 'react';
import appleLogo from '../assets/images/apple-logo.png';

export const StockNotAdded = React.memo(() => {
  const { colors } = useTheme();

  return (
    <HStack alignItems="center" px={6} py={2}>
      <Box mr={6}>
        <Image
          alt="stock graph"
          resizeMode="contain"
          source={{
            uri: appleLogo,
          }}
          size={5}
        />
      </Box>
      <Box style={{ marginRight: 'auto' }}>
        <Heading size={'sm'} color={colors.headingSmall} textTransform={'uppercase'}>
          Apple
        </Heading>
        <Text color={colors.textGray}>Apple Inc.</Text>
      </Box>
      <Button
        variant="solid"
        py={1}
        px={3}
        rounded={40}
        backgroundColor={colors.upBg}
        endIcon={<Icon as={Ionicons} name="ios-add" size={4} color={colors.upTextColor} />}
      >
        <Text color={colors.upTextColor} fontSize={'sm'} fontWeight={700} py={1}>
          Add
        </Text>
      </Button>
    </HStack>
  );
});
