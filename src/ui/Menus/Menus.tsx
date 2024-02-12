import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  createContext,
  useContext,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import { HiEllipsisVertical } from 'react-icons/hi2';

import styled from 'styled-components';

import { useOutsideClick } from '@/hooks/useOutsideClick';

interface MenuProps {
  children: ReactNode;
}

const Menu = styled.div<MenuProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:focus {
    border: none;
    outline: none;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  $position?: {
    x: number;
    y: number;
  };
  ref: RefObject<HTMLUListElement>;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position?.x}px;
  top: ${(props) => props.$position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:focus {
    border: none;
    outline: none;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IPosition {
  x: number;
  y: number;
}

type MenusContextType = {
  openId: number | null;
  close: () => void;
  open: (id: number | null) => void;
  position: IPosition;
  setPosition: Dispatch<SetStateAction<IPosition>>;
};

const MenusContext = createContext({} as MenusContextType);

interface MenusProps {
  children: ReactNode;
}

interface MenusComponent extends React.FC<MenusProps> {
  Menu: React.FC<MenuProps>;
  Toggle: React.FC<ToggleProps>;
  List: React.FC<ListProps>;
  Button: React.FC<ButtonProps>;
}

const Menus: MenusComponent = ({ children }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<IPosition>({
    x: 0,
    y: 0,
  });

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

interface ToggleProps {
  id: number | null;
}

const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    const button = (e.target as HTMLElement)
      .closest('button')
      ?.getBoundingClientRect();

    if (button) {
      const rect = {
        x: window.innerWidth - button.width - button.x,
        y: button.y + button.height + 8,
      };

      setPosition(rect);
    }

    openId === id ? close() : open(id);
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

interface ListProps {
  id: number | null;
  children: ReactNode;
}

const List: React.FC<ListProps> = ({ id, children }) => {
  const { openId, close, position } = useContext(MenusContext);
  const { ref } = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body,
  );
};

interface ButtonProps {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;