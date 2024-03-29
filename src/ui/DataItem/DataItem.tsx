import { ReactNode } from 'react';

import styled from 'styled-components';

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.6rem;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

interface DataItemProps {
  icon: JSX.Element;
  label: string;
  children: ReactNode;
}

const DataItem: React.FC<DataItemProps> = ({ icon, label, children }) => {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
};

export default DataItem;
