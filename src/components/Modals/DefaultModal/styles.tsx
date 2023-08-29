import { Row } from 'components/commons';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const ModalStyle = {
  Container: styled.View`
    background-color: white;
    border: 1px solid ${({ theme }: any) => theme.border};
    padding: 15px;
    border-radius: 20px;
    overflow: hidden;
    justify-content: center;
  `,
  Header: styled(Row)`
    margin-bottom: 15px;
    justify-content: space-between;
  `,
  Title: styled.Text`
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[20]};
  `,
};
