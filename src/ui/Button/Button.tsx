import styled, { RuleSet, css } from 'styled-components';

interface SizeProps {
  small: RuleSet<object>;
  medium: RuleSet<object>;
  large: RuleSet<object>;
}

const $sizes: SizeProps = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

interface VariationsProps {
  primary: RuleSet;
  secondary: RuleSet;
  danger: RuleSet;
  togglePassword: RuleSet;
}

const $variations: VariationsProps = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  togglePassword: css`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    border: none;
    background-color: var(--color-grey-50);
    padding: 0.5rem;
    border-radius: 100%;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: var(--color-grey-200);
    }
  `,
};

interface ButtonProps {
  $size?: keyof SizeProps;
  $variation?: keyof VariationsProps;
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
  }

  ${(props) => props.$size && $sizes[props.$size]}
  ${(props) => props.$variation && $variations[props.$variation]}
`;

Button.defaultProps = {
  $size: 'medium',
  $variation: 'primary',
};

export default Button;
