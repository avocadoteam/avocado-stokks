import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNotificationCb } from 'core/hooks/useNotificationCb';
import { NavigationScreen } from 'core/models';
import { authUser } from 'core/modules/auth/auth-flow';
import { authActions } from 'core/modules/auth/reducer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SearchScreen } from 'screens/SearchScreen';
import { MainScreen } from '../screens/MainScreen';
import { StockScreen } from '../screens/StockScreen';

const { Navigator, Screen } = createStackNavigator();

export const RootNavigation = () => {
  const dispatch = useDispatch();
  useNotificationCb();

  useEffect(() => {
    authUser().then(d => dispatch(authActions.completeAuth(d)));
  }, []);

  return (
    <NavigationContainer>
      <Navigator initialRouteName={NavigationScreen.Main} headerMode="none">
        <Screen name={NavigationScreen.Main} component={MainScreen} />
        <Screen name={NavigationScreen.Stock} component={StockScreen} />
        <Screen name={NavigationScreen.Search} component={SearchScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
