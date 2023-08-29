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
