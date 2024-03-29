import { ScrollView } from 'native-base';
import React, { memo } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { ScreenBox } from 'ui/atoms/ScreenBox';
import { DangerBanner } from 'ui/SettingBanner/DangerBanner';
import { Logout } from 'ui/SettingBanner/Logout';
import { NotificationsBanner } from 'ui/SettingBanner/NotificationsBanner';
import { TermsBanner } from 'ui/SettingBanner/TermsBanner';
import { ThemeBanner } from 'ui/SettingBanner/ThemeBanner';
import { SettingsHeader } from 'ui/SettingsHeader';

type Props = {
  navigation: NavigationStackProp;
};

export const SettingsScreen = memo<Props>(({ navigation }) => {
  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenBox>
      <SettingsHeader onPressBack={onPressBack} />
      <ScrollView>
        <NotificationsBanner />
        <ThemeBanner />
        <TermsBanner />
        <DangerBanner />
        <Logout />
      </ScrollView>
    </ScreenBox>
  );
});
