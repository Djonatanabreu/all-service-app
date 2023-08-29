import { css } from 'styled-components';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const Container = styled.View`
  flex: 1;
  gap: 5px;
`;

interface FieldProps {
  readonly error: boolean;
  theme: DefaultTheme;
}

export const ImageContent = styled.TouchableOpacity`
  background-color: #e4e6e6;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  height: 80px;
  width: 80px;
`;
export const Content = styled.View`
  flex-direction: row;
  gap: 5px;
`;
