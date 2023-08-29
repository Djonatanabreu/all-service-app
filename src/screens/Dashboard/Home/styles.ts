import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const BannerStyle = {
  Container: styled.ScrollView`
    gap: 15px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 150px;
    border-radius: 5px;
  `,
  Card: styled.TouchableOpacity`
    margin-right: 15px;
    width: 240px;
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[14]};
    font-weight: 400;
    text-align: center;
    margin-top: 10px;
    color: #737373;
  `,
};

export const Divulgue = {
  Content: styled.View`
    width: 90%;
    padding: 15px 10px;
    margin-top: 25px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${({ theme }: { theme: DefaultTheme }) =>
      theme.secondary};
  `,
  Row: styled.View`
    flex-direction: row;
    gap:15px;
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
    font-weight: 800;
    color: white;
  `,
  Description: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
    font-weight: 400;
    margin-top: 10px;
    color: white;
  `,
};

export const NewsContent = styled.View`
  gap: 10px;
`;

export const ServiceStyle = {
  Content: styled.ScrollView`
    gap: 15px;
  `,
  Bullet: styled.View`
    background-color: #f9b288;
    width: 25px;
    height: 25px;
    border-radius: 100px;
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[14]};
    font-weight: 400;
    color: #737373;
    text-align: center;
    margin-top: 10px;
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[20]};
    font-weight: 500;
    font-family: 'Agrandir';
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  `,
  Image: styled.Image`
    width: 100%;
    height: 100px;
    border-radius: 5px;
  `,
  Card: styled.TouchableOpacity`
    margin-right: 15px;
    width: 150px;
  `,
};
