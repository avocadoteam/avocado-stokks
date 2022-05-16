import * as Sentry from 'sentry-expo';

import { darkTheme, lightTheme } from './core/theme';

import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as Redux } from 'react-redux';
import { RootNavigation } from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './core/store';
import useCachedResources from './core/hooks/useCachedResources';
import { useColorScheme } from 'react-native';

Sentry.init({
  dsn: 'https://7cc7719f2c8d4f7d830604187af918d8@sr.testfriendship.special.vk-apps.com/7',
  enableInExpoDevelopment: true,
  debug: true,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  let colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <SafeAreaProvider></SafeAreaProvider>;
  } else {
    return (
      <SafeAreaProvider>
        <Redux store={store}>
          <NativeBaseProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </NativeBaseProvider>
        </Redux>
      </SafeAreaProvider>
    );
  }
}
