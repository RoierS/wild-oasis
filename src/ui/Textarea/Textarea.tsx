import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

import styled from 'styled-components';

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  type?: string;
}

const Textarea = styled.textarea<TextareaProps>`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 10rem;
  resize: none;
`;

export default Textarea;
