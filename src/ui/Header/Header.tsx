import styled from 'styled-components';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import UserAvatar from '../UserAvatar/UserAvatar';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.8% 2.8%;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.4rem;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
