import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { useUser } from '@/hooks/useUser';

import FullPageSpinner from '../FullPageSpinner/FullPageSpinner';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <FullPageSpinner />;

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
