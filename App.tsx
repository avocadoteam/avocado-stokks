import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as Redux } from 'react-redux';
import useCachedResources from './core/hooks/useCachedResources';
import { store } from './core/store';
import { darkTheme, lightTheme } from './core/theme';
import { RootNavigation } from './navigation';

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
            <RootNavigation />
          </NativeBaseProvider>
        </Redux>
      </SafeAreaProvider>
    );
  }
}
