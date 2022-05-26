import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainScreen } from '../screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationScreen } from 'core/models';
import { SearchScreen } from 'screens/SearchScreen';
import { SettingsScreen } from 'screens/SettingsScreen';
import { StockScreen } from '../screens/StockScreen';
import { authActions } from 'core/modules/auth/reducer';
import { authUser } from 'core/modules/auth/auth-flow';
import { createStackNavigator } from '@react-navigation/stack';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { useNotificationCb } from 'core/hooks/useNotificationCb';

const { Navigator, Screen } = createStackNavigator();

export const RootNavigation = () => {
  const [screen, setScreen] = useState(NavigationScreen.Main);
  const dispatch = useDispatch();
  const symbol = useSelector(getSelectedSymbol);

  useNotificationCb();

  useEffect(() => {
    authUser().then(d => dispatch(authActions.completeAuth(d)));
  }, []);

  useEffect(() => {
    if (symbol) {
      setScreen(NavigationScreen.Stock);
    }
  }, [symbol]);

  return (
    <NavigationContainer>
      <Navigator initialRouteName={screen} headerMode="none">
        <Screen name={NavigationScreen.Main} component={MainScreen} />
        <Screen name={NavigationScreen.Stock} component={StockScreen} />
        <Screen name={NavigationScreen.Search} component={SearchScreen} />
        <Screen name={NavigationScreen.Settings} component={SettingsScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
