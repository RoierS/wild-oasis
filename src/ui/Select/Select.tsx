import { ChangeEvent } from 'react';

import styled from 'styled-components';

import { IOptions } from '@/types/options';

interface IStyledSelectProps {
  $type?: string;
}

const StyledSelect = styled.select<IStyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 568px) {
    padding: 0.6rem 0.4rem;
  }
`;

interface ISelectProps {
  options: IOptions[];
  value: string;
  $type?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<ISelectProps> = ({ options, value, ...props }) => {
  return (
    <StyledSelect value={value} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
