import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const PageStyle = {
  Image: styled.Image`
    width: 100%;
    height: 180px;
    border-radius: 20px;
  `,
  Content: styled.View`
    padding: 0px 25px;
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
};
