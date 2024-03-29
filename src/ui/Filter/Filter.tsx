import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IOptions } from '@/types/options';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;

  @media screen and (max-width: 380px) {
    flex-direction: column;
    gap: 0.4rem;
    justify-content: center;
  }
`;

interface FilterButtonProps {
  $active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  filterField: string;
  options: IOptions[];
}

const Filter: React.FC<FilterProps> = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlelClick = (value: string) => {
    searchParams.set(filterField, value);
    searchParams.set('page', String(1));
    setSearchParams(searchParams);
  };

  const currentValue = searchParams.get(filterField) || options.at(0)?.value;

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.label}
          onClick={() => handlelClick(option.value)}
          $active={option.value === currentValue}
          disabled={option.value === currentValue}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
