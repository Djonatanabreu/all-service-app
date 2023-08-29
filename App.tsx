import { LoadFonts } from 'components/commons';
import React from 'react';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import 'react-native-gesture-handler';
import Toast, { BaseToast } from 'react-native-toast-message';
import Routes from 'routes';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles/default';

const toastConfig = {
  default: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', marginTop: 25 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red', marginTop: 25 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
};

export default function App() {
  return (
    <LoadFonts>
      <>
        <AutocompleteDropdownContextProvider>
          <ThemeProvider theme={defaultTheme}>
            <Routes />
          </ThemeProvider>
        </AutocompleteDropdownContextProvider>

        <Toast config={toastConfig} />
      </>
    </LoadFonts>
  );
}
