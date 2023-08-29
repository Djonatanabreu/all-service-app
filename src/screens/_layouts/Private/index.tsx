import { Container, Content } from 'components/commons';
import React from 'react';

import { Platform, StatusBar } from 'react-native';

const Private = ({ children }: { children: React.ReactElement }) => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
      StatusBar.setBackgroundColor('#fff');
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

export default Private;
