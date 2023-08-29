import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Text = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
  font-weight: 800;
  font-family: 'Agrandir';
  font-style: italic;
  text-transform: uppercase;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
`;

export const ProfissionalStyle = {
  Image: styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
  `,
  Content: styled.View`
    padding: 15px;
    width: 100%;
    align-items: center;
    flex-direction: row;
    gap: 15px;
    background-color: #ebebeb;
    border-radius: 15px;
  `,
  ButtonText: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[14]};
    font-weight: 400;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.secondary};
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
    font-weight: 400;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.input};
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[20]};
    font-weight: 400;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.secondary};
  `,
};
