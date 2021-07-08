import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { MainHeader } from '../components/MainHeader';
import { theme } from '../theme';

export const MainScreen = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <MainHeader />
    </NativeBaseProvider>
  );
};
