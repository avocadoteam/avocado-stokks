import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, IconButton, useTheme } from 'native-base';
import React from 'react';

interface StockHeaderProps {
  onPressBack: () => void;
}

export const StockHeader = React.memo<StockHeaderProps>(({ onPressBack }) => {
  const { colors } = useTheme();

  return (
    <HStack mt={12} py={2} px={4}>
      <IconButton
        variant="unstyled"
        icon={<Icon size="sm" as={<Ionicons name="arrow-back" />} color={colors.primary[100]} />}
        onPress={onPressBack}
      />
    </HStack>
  );
});
