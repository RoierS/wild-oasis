import { cloneElement, createContext, useContext, useState } from 'react';

import { createPortal } from 'react-dom';

import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

import { useOutsideClick } from '@/hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-height: 90vh;
  overflow: auto;
  max-width: 70rem;
  min-width: 22rem;
  width: 80%;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media screen and (max-width: 768px) {
    padding: 3.2rem 1.5rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 0.2rem;
  right: 0.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

type ModalContextType = {
  close: () => void;
  open: (name: string) => void;
  openName: string;
};

const ModalContext = createContext({} as ModalContextType);

interface ModalProps {
  children: React.ReactNode;
}

interface ModalComponent extends React.FC<ModalProps> {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
}

const Modal: ModalComponent = ({ children }) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

interface OpenProps {
  children: React.ReactNode;
  opens: string;
}
const Open: React.FC<OpenProps> = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opensWindowName),
  });
};

interface WindowProps {
  name: string;
  children: React.ReactNode;
}
const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);

  const { ref } = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>
          {cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,

    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
