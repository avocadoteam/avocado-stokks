import React, { memo } from 'react';
import { IconButton, Icon, HStack, Heading, useTheme } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  showWelcome: boolean;
};

export const MainHeader = memo<Props>(({ showWelcome }) => {
  const { colors } = useTheme();

  return (
    <HStack mt={12} py={2} px={6} justifyContent="space-between" alignItems="center">
      <Heading color={colors.heading}>{showWelcome ? 'Welcome' : 'Stokks'}</Heading>
      <IconButton variant="unstyled" icon={<Icon size="sm" as={<AntDesign name="search1" />} color={colors.primary} />} />
    </HStack>
  );
});
