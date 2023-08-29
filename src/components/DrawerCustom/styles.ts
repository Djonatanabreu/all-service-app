import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Container = styled.View`
  flex: 1;
  padding: 20px 0px;
  background-color: #f79586;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: auto;
`;

export const HeaderStyle = {
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[26]};
    color: #000;
    padding: 0px 15px;
    font-family: 'Agrandir';
    z-index: 5;
  `,
  Content: styled.View``,
  Footer: styled.View`
    margin-top: auto;
    align-items: center;
  `,
  Center: styled.View`
    padding-left: 5px;
    gap: 2px;
  `,
  Img: styled.Image`
    height: 230px;
    width: 100%;
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
    color: #000;
    font-family: 'Agrandir';
  `,
  Item: styled.TouchableOpacity`
    padding: 2px 0px;
    align-items: center;
    flex-direction: row;
  `,
  Name: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[18]};
    font-family: 'Agrandir';
    color: #ea1e0e;
  `,
};
