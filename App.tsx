import * as Sentry from 'sentry-expo';

import React from 'react';
import { Provider as Redux } from 'react-redux';
import { RootNavigation } from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './ThemeProvider';
import { store } from './core/store';
import useCachedResources from './core/hooks/useCachedResources';

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
