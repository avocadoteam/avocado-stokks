import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';

import useCachedResources from './hooks/useCachedResources';
import { Navigation } from './navigation';
import { lightTheme, darkTheme } from './theme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  let colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <SafeAreaProvider></SafeAreaProvider>;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
          <Navigation />
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
