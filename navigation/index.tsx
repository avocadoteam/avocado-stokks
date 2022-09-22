import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useLogin } from 'core/hooks/useLogin';
import { useNotificationCb } from 'core/hooks/useNotificationCb';
import { useUserTheme } from 'core/hooks/useUserTheme';
import { NavigationScreen } from 'core/models';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { useTheme } from 'native-base';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { MainScreen } from 'screens/MainScreen';
import { SearchScreen } from 'screens/SearchScreen';
import { SettingsScreen } from 'screens/SettingsScreen';
import { StockScreen } from 'screens/StockScreen';

const { Navigator, Screen } = createStackNavigator();

export const RootNavigation = () => {
  const [screen, setScreen] = useState(NavigationScreen.Main);
  const navRef = useRef<NavigationContainerRef>(null);
  const symbol = useSelector(getSelectedSymbol);

  useLogin();
  useNotificationCb();

  useEffect(() => {
    if (symbol) {
      setScreen(NavigationScreen.Stock);
      navRef.current?.navigate(NavigationScreen.Stock);
    }
  }, [symbol]);

  const { colors } = useTheme();
  const theme = useUserTheme();
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.appBackground);
    StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content', true);
  }, [theme]);

  return (
    <NavigationContainer ref={navRef}>
      <Navigator initialRouteName={screen} headerMode="none">
        <Screen name={NavigationScreen.Main} component={MainScreen} />
        <Screen name={NavigationScreen.Stock} component={StockScreen} />
        <Screen name={NavigationScreen.Search} component={SearchScreen} />
        <Screen name={NavigationScreen.Settings} component={SettingsScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
