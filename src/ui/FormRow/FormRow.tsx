import { ReactNode, isValidElement } from 'react';

import { styled } from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.7fr 1fr;
  gap: 1.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button[type='submit']) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    gap: 0.4rem;
    padding: calc(4px + 1.5vw) 0;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: 1fr;

    &:has(button[type='submit']) {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1.2rem;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 2 / 3;

  @media screen and (max-width: 380px) {
    grid-column: 1 / 2;
  }
`;

interface IFormRowProps {
  labelName?: string;
  errorMessage?: string;
  children: ReactNode;
}

const FormRow: React.FC<IFormRowProps> = ({
  labelName,
  errorMessage,
  children,
}) => {
  return (
    <StyledFormRow>
      {labelName && isValidElement(children) && (
        <Label htmlFor={children.props.id}>{labelName}</Label>
      )}
      {children}
      {errorMessage && <Error>{errorMessage}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
