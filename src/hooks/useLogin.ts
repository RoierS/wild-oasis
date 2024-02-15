import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '@/services/apiAuth';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });

      toast.success('Login successful!');

      navigate('/dashboard');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
};
