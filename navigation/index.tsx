import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MainScreen } from '../screens/MainScreen';
import { StockScreen } from '../screens/StockScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StockScreen" headerMode="none">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="StockScreen" component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
