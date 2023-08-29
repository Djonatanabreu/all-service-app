import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const PageStyle = {
  Image: styled.Image`
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 100px;
    margin: auto;
    z-index: 5;
    top: 100px;
  `,
  ViewBackground: styled.View`
    position: absolute;
    z-index: 1;
    top: 0px;
    height: 200px;
    width: 100%;
    background-color: rgba(52, 52, 52, 0.6);
  `,
  Cover: styled.Image`
    width: 100%;
    height: 200px;
  `,
  Content: styled.View`
    gap: 15px;
  `,
  Photo: styled.Image`
    height: 130px;
    width: 180px;
    border-radius: 10px;
    margin-right: 15px;
  `,
  ScrollView: styled.ScrollView`
    margin-bottom: 50px;
  `,

  Box: styled.View`
    align-items: center;
  `,
  CategorieTitle: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
    font-weight: 500;
    text-align: center;
    margin-top: 5px;
    font-family: 'Agrandir';
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  `,
  Label: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
    font-weight: 400;
    text-align: center;
    font-family: 'Agrandir';
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
    font-weight: 600;
    text-align: center;
    margin-top: 5px;
    font-family: 'Agrandir';
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  `,
  ButtonLabel: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
    font-weight: 500;
    text-align: center;
    font-family: 'Agrandir';
    color: #ffffff;
    margin-left: 15px;
  `,
  ButtonWhats: styled.TouchableOpacity`
    background-color: #ea1e0e;
    border-radius: 100px;
    margin-top: 25px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    gap: 20px;
    height: 45px;
    width: 80%;
    padding-horizontal: 20px;
  `,
};
