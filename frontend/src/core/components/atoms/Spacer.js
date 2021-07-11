import styled from 'styled-components';

export const Spacer = styled.hr`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grey};
`;
