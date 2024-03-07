import styled, { css } from 'styled-components';

interface FormProps {
  type?: 'modal' | 'regular';
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: calc(6px + 1.5vw);

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      max-width: 80rem;
      min-width: 22rem;
      width: 100%;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
