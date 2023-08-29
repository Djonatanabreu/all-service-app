import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';
import { DefaultTheme } from 'styles/default';
import { Dimensions, KeyboardAvoidingView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React from 'react';

export const LoadFonts = ({ children }: { children: React.ReactElement }) => {
  const [fontsLoaded] = useFonts({
    Agrandir: require('assets/fonts/Agrandir-Regular.otf'),
    RedHatDisplay: require('assets/fonts/RedHatDisplay-Regular.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};

export const Title = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
  font-weight: 500;
  text-align: center;
  font-family: 'Agrandir';
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
`;
export const Line = styled.View<{ marginView: boolean }>`
  width: 50%;
  height: 2px;
  ${({ marginView }) => marginView && 'margin: auto'};
  background-color: #2a6dba;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 5px;
`;

export const CenterView = styled.View`
  margin: auto;
`;

export const Column = styled.View`
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ContainerPage = styled.View`
  flex: 1;
  gap: 10px;
  height: ${Dimensions.get('screen').height}px;
`;

export const ContentPage = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px 15px;
  margin: 15px 0px;
`;

export const Content = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const ContentScroll = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

export const TitleAuth = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.secondary};
  font-weight: 700;
  text-align: center;
  font-family: 'Agrandir';
`;
