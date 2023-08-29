import styled from 'styled-components/native';

export const ModalStyle = {
  Container: styled.View`
    background-color: white;
    border: 1px solid ${({ theme }: any) => theme.border};
    padding: 5px;
    border-radius: 100px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  `,
 
};
