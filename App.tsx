import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './core/hooks/useCachedResources';
import { Navigation } from './navigation';
import { darkTheme, lightTheme } from './core/theme';
import { Provider as Redux } from 'react-redux';
import { store } from './core/store';

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
            <Navigation />
          </NativeBaseProvider>
        </Redux>
      </SafeAreaProvider>
    );
  }
}
