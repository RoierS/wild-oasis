import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from '@/features/authentication/LoginForm';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useUser } from '@/hooks/useUser';
import FullPageSpinner from '@/ui/FullPageSpinner/FullPageSpinner';
import Heading from '@/ui/Heading/Heading';
import Logo from '@/ui/Logo/Logo';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(3rem, 48rem);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  padding: 3vw;
  background-color: var(--color-grey-50);

  @media screen and (max-width: 768px) {
    gap: 1.4rem;

    & h3 {
      text-align: center;
    }
  }
`;

const Login = () => {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <LoginLayout>
      <Logo />
      <Heading as={isMobile ? 'h3' : 'h4'}>Log in to your account</Heading>

      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
