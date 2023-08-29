import styled, { css } from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Container = styled.View`
  align-self: stretch;
  gap: 5px;
`;

export const Label = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.secondary};
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[14]};
`;

interface FieldProps {
  readonly error: boolean;
  theme: DefaultTheme;
  gray: boolean;
  multiline?: boolean;
  removeRadius?: boolean;
}
export const FieldContainer = styled.View<FieldProps>`
  display: flex;
  padding: 0px 5px;
  ${({ multiline }) =>
    multiline &&
    css`
      height: 80px;
    `}
  position: relative;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: ${({ removeRadius }) => (removeRadius ? '15px' : '100px')};
  border: ${({ theme, gray, removeRadius }) =>
    gray ? 'none' : ` 1px solid ${theme.border}`};
  background-color: ${({ theme, gray }) =>
    gray ? '#E4E4E4' : theme.background};
  align-items: center;
  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.error};
    `}
`;

export const Field = styled.TextInput`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[14]};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.input};
  flex: 1;
  height: 50px;
  padding: 0px 8px;
`;

export const Error = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
  color: ${({ theme }) => theme.error};
`;
