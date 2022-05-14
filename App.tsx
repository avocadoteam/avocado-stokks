import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as Redux } from 'react-redux';
import * as Sentry from 'sentry-expo';
import { SSRProvider } from '@react-aria/ssr';
import useCachedResources from './core/hooks/useCachedResources';
import { store } from './core/store';
import { darkTheme, lightTheme } from './core/theme';
import { RootNavigation } from './navigation';

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
      <SSRProvider>
        <SafeAreaProvider>
          <Redux store={store}>
            <NativeBaseProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
              <RootNavigation />
            </NativeBaseProvider>
          </Redux>
        </SafeAreaProvider>
      </SSRProvider>
    );
  }
}
