import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';

import { MainScreen } from '../screens/MainScreen';
import { NavigationScreen } from 'core/models';
import { SearchScreen } from 'screens/SearchScreen';
import { SettingsScreen } from 'screens/SettingsScreen';
import { StockScreen } from '../screens/StockScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { useLogin } from 'core/hooks/useLogin';
import { useNotificationCb } from 'core/hooks/useNotificationCb';
import { useSelector } from 'react-redux';

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
