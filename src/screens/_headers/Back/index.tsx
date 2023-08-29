import React from 'react';

import { Container, Content, Title } from './styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BackHeader {
  title?: string;
  chevronLeft?: boolean;
}
const BackHeader = ({ title, chevronLeft = true }: BackHeader) => {
  const navigation: any = useNavigation();

  return (
    <Container>
      <Content>
        {chevronLeft ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={25} color="#184668" />
          </TouchableOpacity>
        ) : null}
        {title ? <Title>{title}</Title> : null}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <FontAwesome5 name="bars" size={25} color="#737373" />
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default BackHeader;
