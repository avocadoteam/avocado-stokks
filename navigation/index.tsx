import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MainScreen } from '../screens/MainScreen';
import { StockScreen } from '../screens/StockScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const { Navigator, Screen } = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="MainScreen" headerMode="none">
        <Screen name="MainScreen" component={MainScreen} />
        <Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Screen name="StockScreen" component={StockScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
