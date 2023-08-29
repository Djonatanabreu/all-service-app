import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const PageStyle = {
  Content: styled.View`
    gap: 15px;
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[18]};
    font-weight: 500;
    text-align: justify;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
    font-weight: 800;
    text-align: center;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  `,

  NewsItemContainer: styled.View`
    flex-direction: row;
    margin: 10px;
  `,

  NewsImage: styled.Image`
    width: ${Dimensions.get('screen').width * 0.38}px;
    height: ${Dimensions.get('screen').height * 0.11}px;
    border-radius: 4px;
  `,

  NewsContent: styled.View`
    flex: 1;
    margin-left: 10px;
  `,

  NewsTitle: styled.Text`
    font-size: 14px;
    font-weight: 400;
  `,

  NewsSummary: styled.Text`
    margin-top: 5px;
    font-size: 14px;
  `,
  SeeMore: styled.Text`
    margin-top: 5px;
    font-size: 10px;
    align-self: flex-end;
  `,
};
