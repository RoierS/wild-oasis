import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/services/apiAuth';

export const useUser = () => {
  const {
    isLoading,
    data: userData,
    fetchStatus,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    userData,
    isAuthenticated: userData?.role === 'authenticated',
    fetchStatus,
  };
};
