import * as Sentry from 'sentry-expo';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as Redux } from 'react-redux';
import useCachedResources from './core/hooks/useCachedResources';
import { store } from './core/store';
import { RootNavigation } from './navigation';
import { ThemeProvider } from './ThemeProvider';

Sentry.init({
  dsn: 'https://7cc7719f2c8d4f7d830604187af918d8@sr.testfriendship.special.vk-apps.com/7',
  enableInExpoDevelopment: true,
  debug: true,
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <SafeAreaProvider></SafeAreaProvider>;
  } else {
    return (
      <SafeAreaProvider>
        <Redux store={store}>
          <ThemeProvider>
            <RootNavigation />
          </ThemeProvider>
        </Redux>
      </SafeAreaProvider>
    );
  }
}
