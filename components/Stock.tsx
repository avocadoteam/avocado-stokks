import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HStack, Image, Box, Heading, Text, useTheme } from 'native-base';
import graphSrc from '../assets/images/Graph.png';

interface StockProps {
  up: boolean;
  onPress: () => void;
}

export const Stock = React.memo<StockProps>(({ up, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack alignItems="center" px={6}>
        <Box mr={7}>
          <Image alt="stock graph" resizeMode="contain" source={graphSrc} size={'md'} />
        </Box>
        <Box style={{ marginRight: 'auto' }}>
          <Heading size={'sm'} color={colors.headingSmall} textTransform={'uppercase'}>
            Ndaq
          </Heading>
          <Text color={colors.textGray}>Nasdaq, Inc.</Text>
        </Box>
        <Box>
          <Text color={colors.textDarkGray} fontSize={'sm'} fontWeight={700} py={1}>
            2.365,70
          </Text>
          <Box bg={up ? colors.upBg : colors.downBg} borderRadius={30} py={1} px={2}>
            <Text textAlign="center" color={up ? colors.upTextColor : colors.downTextColor} fontWeight={700}>
              -0,67
            </Text>
          </Box>
        </Box>
      </HStack>
    </TouchableOpacity>
  );
});
