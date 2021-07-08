import React from 'react';
import { IconButton, Button, Icon, HStack, Heading, useTheme } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export const MainHeader = () => {
  const { colors } = useTheme();

  return (
    <HStack mt={12} px={6} justifyContent="space-between" alignItems="center">
      <Heading color={colors.heading}>Stokks</Heading>
      {/* <Button variant="ghost">
        <Icon name="search1" as={AntDesign} color={colors.primary} size={30} />
      </Button> */}
      <IconButton
        variant="unstyled"
        icon={<Icon size="md" as={<AntDesign name="search1" />} color={colors.primary} />}
      />
    </HStack>
  );
};
