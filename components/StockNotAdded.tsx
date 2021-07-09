import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HStack, Image, Box, Heading, Text, useTheme, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const StockNotAdded = React.memo(() => {
  const { colors } = useTheme();

  return (
    <HStack alignItems="center" px={6} py={2}>
      <Box mr={6}>
        <Image
          alt="stock graph"
          resizeMode="contain"
          source={require('../assets/images/apple-logo.png')}
          size={5}
        />
      </Box>
      <Box style={{ marginRight: 'auto' }}>
        <Heading size={'sm'} color={colors.headingSmall} textTransform={'uppercase'}>
          Apple
        </Heading>
        <Text color={colors.textGray}>Apple Inc.</Text>
      </Box>
      <TouchableOpacity>
        <Button
          variant="solid"
          py={1}
          px={3}
          backgroundColor={colors.upBg}
          borderRadius={40}
          endIcon={<Icon as={Ionicons} name="add-sharp" size={4} color={colors.upTextColor} />}
        >
          <Text color={colors.upTextColor} fontSize={'sm'} fontWeight={700} py={1}>
            Add
          </Text>
        </Button>
      </TouchableOpacity>
    </HStack>
  );
});
