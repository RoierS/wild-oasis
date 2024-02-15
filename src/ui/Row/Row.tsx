import styled, { css } from 'styled-components';

interface RowProps {
  $type: 'vertical' | 'horizontal';
}

const Row = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.$type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
    `}

  ${(props) =>
    props.$type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.8rem;
    `}
`;

export default Row;
