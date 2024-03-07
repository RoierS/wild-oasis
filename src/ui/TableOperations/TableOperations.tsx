import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;

  @media screen and (max-width: 1078px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.8rem;
  }

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

export default TableOperations;
