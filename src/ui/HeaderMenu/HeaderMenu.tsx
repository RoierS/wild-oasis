import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Logout from '@/features/authentication/Logout';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
