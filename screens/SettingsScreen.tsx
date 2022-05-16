import React, { memo, useEffect, useMemo } from 'react';
import { Box, ScrollView, useTheme } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { SettingsHeader } from 'ui/SettingsHeader';
import { NotificationsBanner } from 'ui/SettingBanner/NotificationsBanner';
import { TermsBanner } from 'ui/SettingBanner/TermsBanner';
import { ThemeBanner } from 'ui/SettingBanner/ThemeBanner';
import { DangerBanner } from 'ui/SettingBanner/DangerBanner';

type Props = {
  navigation: NavigationStackProp;
};

export const SettingsScreen = memo<Props>(({ navigation }) => {
  const { colors } = useTheme();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <SettingsHeader onPressBack={onPressBack} />
      <ScrollView px={5}>
        <NotificationsBanner />
        <ThemeBanner />
        <TermsBanner />
        <DangerBanner />
      </ScrollView>
    </Box>
  );
});
