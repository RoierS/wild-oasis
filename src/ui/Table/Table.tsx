import React, { createContext, useContext } from 'react';

import styled from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
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

interface ITableProps {
  columns: string;
  children: React.ReactNode;
}

interface TableComponent extends React.FC<ITableProps> {
  Header: React.FC<IHeaderProps>;
  Row: React.FC<IRowProps>;
  Body: React.FC<IBodyProps>;
  Footer: React.FC;
  EmptyRow: React.FC;
}

const Table: TableComponent = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

interface IHeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
};

interface IRowProps {
  children: React.ReactNode;
  role?: string;
}

const Row: React.FC<IRowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
};

interface IBodyProps {
  children: React.ReactNode;
}
const Body: React.FC<IBodyProps> = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

const EmptyRow: React.FC = () => {
  return <Empty>No data</Empty>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
Table.EmptyRow = EmptyRow;

export default Table;
