import { Container as ContainerDefault } from 'components/commons';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Container = styled(ContainerDefault)`
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackgroundAuth = styled.Image`
  position: absolute;
  height: 300px;
  width: 100%;
  top: -60px;
`;

export const ButtonText = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.secondary};
  text-align: center;
`;

export const ImageAuth = styled.Image`
  width: 120px;
  height: 120px;
  position: absolute;
  top: 10px;
`;
