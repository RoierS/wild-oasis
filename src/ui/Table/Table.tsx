import React, { ReactNode, createContext, useContext } from 'react';

import styled from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;
  width: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const StyledTableContainer = styled.div`
  min-width: 700px;
  max-width: 1200px;
`;

interface CommonRowProps {
  $columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  width: auto;
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  width: auto;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableContextType = {
  columns: string;
};

const TableContext = createContext({} as TableContextType);

interface TableProps {
  columns: string;
  children: ReactNode;
}

const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">
        <StyledTableContainer>{children}</StyledTableContainer>
      </StyledTable>
    </TableContext.Provider>
  );
};

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

interface RowProps {
  children: ReactNode;
  role?: string;
}

const Row: React.FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
};

interface BodyProps<T> {
  data: T[];
  render: (item: T) => ReactNode;
}
const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (data.length === 0) {
    return <Empty>No data to show</Empty>;
  }
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
