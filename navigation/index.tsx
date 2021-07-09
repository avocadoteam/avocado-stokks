import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainScreen } from '../screens/MainScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <WelcomeScreen />
    </NavigationContainer>
  );
};
