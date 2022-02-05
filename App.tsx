import React from 'react';
import { Provider as Redux } from 'react-redux';
import { useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './core/hooks/useCachedResources';
import { RootNavigation } from './navigation';
import { darkTheme, lightTheme } from './core/theme';
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
            <RootNavigation />
          </NativeBaseProvider>
        </Redux>
      </SafeAreaProvider>
    );
  }
}
