import { LinearGradient } from 'expo-linear-gradient';
import styled, { css } from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

interface ButtonProps {
  readonly disabled: boolean;
  readonly color: 'primary' | 'danger' | 'secondary' | 'success' | 'warning';
  readonly variantType: 'linear' | 'block' | 'outline' | 'inline';
  readonly fullWidth?: boolean;
  small: boolean;
  readonly loading?: boolean;
  theme: DefaultTheme;
}

interface LabelProps {
  readonly color:
    | 'linear'
    | 'primary'
    | 'danger'
    | 'secondary'
    | 'success'
    | 'warning';
  readonly variantType: 'linear' | 'block' | 'outline' | 'inline';
  theme: DefaultTheme;
  small: boolean;
}

export const ContainerLinear = styled(LinearGradient).attrs({
  colors: ['#FFA500', '#ff9500', '#FF8C00'],
  start: [0, 1],
  end: [1, 0],
})<ButtonProps>`
  height: 45px;

  ${({ fullWidth }) => fullWidth && 'width: 100%'}
  ${({ disabled, loading }) => (disabled || loading) && 'opacity:  0.5;'}

  border-radius: 15px;
  align-items: center;
  padding: 0px 15px;
  justify-content: center;
`;

export const Container = styled.TouchableOpacity<ButtonProps>`
  height: 55px;

  ${({ fullWidth }) => fullWidth && 'width: 100%'}
  ${({ disabled, loading }) => (disabled || loading) && 'opacity:  0.5;'}
  ${({ color, theme, variantType }) => {
    if (variantType === 'block')
      return css`
        border-radius: 15px;
        align-items: center;
        padding: 0px 35px;
        justify-content: center;
        background-color: ${theme.buttons[color].background};
      `;
    if (variantType === 'outline') {
      return css`
        border-radius: 8px;
        border-width: 1px;
        align-items: center;
        padding: 0px 15px;
        justify-content: center;
        border-color: ${theme.buttons[color].background};
      `;
    }

    return css`
      flex-wrap: wrap;
      flex-direction: row;
      color: ${theme.buttons[color].background};
    `;
  }}

${({ small }) =>
    small &&
    css`
      height: 30px;
    `}
`;

export const Label = styled.Text<LabelProps>`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
  font-weight: 500;
  font-family: 'Agrandir';
  ${({ color, theme, variantType }) => {
    if (variantType === 'block')
      return css`
        color: ${theme.buttons[color].foreground};
      `;

    return css`
      color: ${theme.buttons[color].background};
    `;
  }}
  ${({ small }) =>
    small &&
    css`
      color: black;
      font-size: ${({ theme }: { theme: DefaultTheme }) =>
        theme.fonts.size[14]};
    `}
`;
