import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { PageStyle } from '../styles';
import { Props } from 'interfaces/routes.interface';
import { ContentScroll } from 'components/commons';
import RenderHTML from 'react-native-render-html';
import BackHeader from 'screens/_headers/Back';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  letter-spacing: 1px;
`;

const Content = styled.Text`
  font-size: 16px;
`;

interface INewsDetailProps {
  imagem: ImageSourcePropType;
  titulo: string;
  descricao: string;
}

const NewsDetail = ({ route, navigation }: Props) => {
  const { titulo, imagem, descricao, resumo } = route.params;

  console.log(descricao);

  const { width, height } = useWindowDimensions();
  return (
    <ContentScroll>
      <BackHeader title="Notícia" onPress={'Noticias'} />
      <PageStyle.NewsImage
        style={{
          marginVertical: 10,
          width: width * 0.85,
          height: height * 0.25,
          alignSelf: 'center',
        }}
        source={{ uri: imagem }}
      />

      <Container>
        <Header>{titulo}</Header>
        <Text style={{ fontSize: 16, letterSpacing: 2, marginVertical: 10 }}>
          {resumo}
        </Text>

        <RenderHTML
          contentWidth={width}
          tagsStyles={{
            p: {
              fontSize: 16,
              marginTop: 10,
            },
          }}
          source={{
            html: descricao,
          }}
        />
      </Container>
    </ContentScroll>
  );
};

export default NewsDetail;
