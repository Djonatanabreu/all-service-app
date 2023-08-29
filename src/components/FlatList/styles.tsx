import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const FlatListComponent = styled.FlatList.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 10,
  },
})``;

export const TextEmpty = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  font-size:  ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[16]};
  width: 100%;
  text-align: center;
  font-weight: 600;
  margin: 30px 0px;
  font-family: 'Agrandir';
`;
