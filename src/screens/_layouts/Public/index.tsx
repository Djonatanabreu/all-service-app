import { Container, Content } from 'components/commons';
import React from 'react';

import { Platform, StatusBar } from 'react-native';
import { defaultTheme } from 'styles/default';

const Public = ({ children }: { children: React.ReactElement }) => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor(defaultTheme.primary);
    } else {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, []);

  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};
export default Public;
