import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { authUser } from 'core/modules/auth/auth-flow';
import { authActions } from 'core/modules/auth/reducer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainScreen } from '../screens/MainScreen';
import { StockScreen } from '../screens/StockScreen';

const { Navigator, Screen } = createStackNavigator();

export const RootNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authUser().then(d => dispatch(authActions.completeAuth(d)));
  }, []);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="MainScreen" headerMode="none">
        <Screen name="MainScreen" component={MainScreen} />
        <Screen name="StockScreen" component={StockScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
