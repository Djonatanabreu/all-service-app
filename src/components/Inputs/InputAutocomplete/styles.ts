import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Container = styled.View`
  align-self: stretch;
  gap: 5px;
`;

export const Label = styled.Text`
  color: #666;
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[14]};
`;

interface FieldProps {
  readonly error: boolean;
  theme: DefaultTheme;
  removeBorder?: boolean;
  gray: boolean;
  multiline?: boolean;
}
export const FieldContainer = styled.View<FieldProps>`
  ${Platform.select({ ios: { zIndex: -1 } })}
  flex-direction: row;
  padding: 0px 15px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  border: ${({ theme, gray }) =>
    gray ? 'none' : ` 1px solid ${theme.border}`};
  background-color: ${({ theme, gray }) =>
    gray ? '#E4E4E4' : theme.background};
  align-items: center;
  border-radius: 100px;
  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.error};
    `}
`;

export const Field = styled.TextInput`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.input};
  flex: 1;
  height: 45px;
  padding: 0px 10px;
`;

export const Error = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
  color: ${({ theme }) => theme.error};
`;
