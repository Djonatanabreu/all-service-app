import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Label = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
  font-weight: 500;
  font-family: 'Agrandir';
  text-align: center;
  margin-top: 15px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.secondary};
`;
