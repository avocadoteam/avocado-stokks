import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDoubleClick } from 'core/hooks/useDoubleClick';
import { NavigationModal, NavigationScreen } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { Flex, Heading, HStack, Icon, IconButton, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingsOutlineIcon } from './icons/SettingsOutlineIcon';

export const MainHeader = memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const doubleClickTitleHandler = useDoubleClick(() => {
    dispatch(modalActions.openModal(NavigationModal.Info));
  });

  const navigation = useNavigation();
  const openSearch = React.useCallback(() => {
    navigation.navigate(NavigationScreen.Search);
  }, []);
  const openSettings = React.useCallback(() => {
    navigation.navigate(NavigationScreen.Settings);
  }, []);

  return (
    <HStack mt={12} py={2} px={6} justifyContent="space-between" alignItems="center">
      <Pressable onPress={doubleClickTitleHandler}>
        <Heading color={colors.heading}>Stokks</Heading>
      </Pressable>
      <Flex flexDirection="row">
        <IconButton
          onPress={openSearch}
          variant="unstyled"
          icon={<Icon size="sm" as={<AntDesign name="search1" />} color={colors.primary[100]} />}
        />
        <IconButton onPress={openSettings} variant="unstyled" icon={<SettingsOutlineIcon />} />
      </Flex>
    </HStack>
  );
});
