import React from 'react';
import { PageStyle } from './styles';
import { NewsItemType } from './Types';
import { TouchableOpacity } from 'react-native';

const NewsItem = ({ titulo, resumo, imagem, onPress }: NewsItemType) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <PageStyle.NewsItemContainer>
        <PageStyle.NewsImage
          resizeMode="cover"
          source={{
            uri: imagem as string,
          }}
        />
        <PageStyle.NewsContent>
          <PageStyle.NewsTitle ellipsizeMode="tail">
            {titulo}
          </PageStyle.NewsTitle>
          <PageStyle.NewsSummary>{resumo}</PageStyle.NewsSummary>
          <PageStyle.SeeMore>VEJA MAIS...</PageStyle.SeeMore>
        </PageStyle.NewsContent>
      </PageStyle.NewsItemContainer>
    </TouchableOpacity>
  );
};

export default NewsItem;
