import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { signupUser } from '@/services/apiAuth';

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });

      toast.success('Account created successfully!');

      navigate('/dashboard');
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp };
};
