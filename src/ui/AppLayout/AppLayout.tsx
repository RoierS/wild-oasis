import { Outlet } from 'react-router-dom';

import { styled } from 'styled-components';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, 22rem) 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;

  @media screen and (max-width: 768px) {
    grid-template-columns: 5rem 1fr;
    justify-content: center;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 3%;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media screen and (max-width: 768px) {
    gap: 2vw;
  }
`;

const AppLayout: React.FC = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
