import React, { useEffect } from 'react';

import { MainScreen } from '../screens/MainScreen';
import { NavigationScreen } from 'core/models';
import { SearchScreen } from 'screens/SearchScreen';
import { StockScreen } from '../screens/StockScreen';
import { authActions } from 'core/modules/auth/reducer';
import { authUser } from 'core/modules/auth/auth-flow';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useNotificationCb } from 'core/hooks/useNotificationCb';

const { Navigator, Screen } = createStackNavigator();

export const RootNavigation = () => {
  const dispatch = useDispatch();
  useNotificationCb();

  useEffect(() => {
    authUser().then(d => dispatch(authActions.completeAuth(d)));
  }, []);

  return (
    <Navigator initialRouteName={NavigationScreen.Main} headerMode="none">
      <Screen name={NavigationScreen.Main} component={MainScreen} />
      <Screen name={NavigationScreen.Stock} component={StockScreen} />
      <Screen name={NavigationScreen.Search} component={SearchScreen} />
    </Navigator>
  );
};
