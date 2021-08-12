import React, { memo } from 'react';
import { IconButton, Icon, HStack, Heading, useTheme } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreen } from 'core/models';

type Props = {
  showWelcome: boolean;
};

export const MainHeader = memo<Props>(({ showWelcome }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const openSearch = React.useCallback(() => {
    navigation.navigate(NavigationScreen.Search);
  }, []);

  return (
    <HStack mt={12} py={2} px={6} justifyContent="space-between" alignItems="center">
      <Heading color={colors.heading}>{showWelcome ? 'Welcome' : 'Stokks'}</Heading>
      <IconButton
        onPress={openSearch}
        variant="unstyled"
        icon={<Icon size="sm" as={<AntDesign name="search1" />} color={colors.primary[100]} />}
      />
    </HStack>
  );
});
