import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainScreen } from '../screens/MainScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { StockScreen } from '../screens/StockScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen" headerMode="none">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="StockScreen" component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
