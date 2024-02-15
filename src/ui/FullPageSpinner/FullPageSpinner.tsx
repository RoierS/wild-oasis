import { styled } from 'styled-components';

import Spinner from '../Spinner/Spinner';

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const FullPageSpinner = () => (
  <FullPage>
    <Spinner />
  </FullPage>
);

export default FullPageSpinner;
