import { HStack, IconButton, useTheme } from 'native-base';
import React from 'react';
import { ArrowBackIcon } from './icons/ArrowBackIcon';

interface StockHeaderProps {
  onPressBack: () => void;
}

export const StockHeader = React.memo<StockHeaderProps>(({ onPressBack }) => {
  const { colors } = useTheme();

  return (
    <HStack mt={12} py={2} px={4}>
      <IconButton variant="unstyled" icon={<ArrowBackIcon />} onPress={onPressBack} />
    </HStack>
  );
});
