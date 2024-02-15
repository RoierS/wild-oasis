import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '@/services/apiAuth';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    error,
    mutate: logout,
    isPending: isLoggingOut,
  } = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries();

      toast.success('Logout successful!');

      navigate('/login', { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    error,
    logout,
    isLoggingOut,
  };
};
