import styled from 'styled-components';

import Logo from '../Logo/Logo';
import MainNav from '../MainNav/MainNav';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media screen and (max-width: 1068px) {
    padding: 2.2rem 1.4rem;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media screen and (max-width: 568px) {
    padding: 1rem 0.3rem;
    align-items: center;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
