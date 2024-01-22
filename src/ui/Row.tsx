import styled, { css } from 'styled-components';

interface RowProps {
  $type: 'horizontal' | 'vertical';
}

const Row = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.$type === 'horizontal' &&
    css`
      align-items: space-between;
      justify-content: center;
    `}

  ${(props) =>
    props.$type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.8rem;
    `}
`;

export default Row;
