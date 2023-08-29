import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

interface ButtonProps {
  readonly height: number;
  readonly width: number;
  theme: DefaultTheme;
}

export const AvatarStyle = {
  Container: styled.TouchableOpacity<ButtonProps>`
    background-color: white;
    border: 1px solid ${({ theme }) => theme.border};
    padding: 5px;
    border-radius: 100px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: ${({ width }) => `${width + 5}px`};
    height: ${({ height }) => `${height + 5}px`};
  `,
  Image: styled.Image<{ width: number; height: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
  `,
};
