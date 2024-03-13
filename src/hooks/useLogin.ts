import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { uploadAllData } from '@/data/uploadAllData';
import { loginUser } from '@/services/apiAuth';
import { ILoginForm } from '@/types/loginForm';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({ email, password }: ILoginForm) => {
      const user = await loginUser({ email, password });
      await uploadAllData(); // Upload actual sample data
      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);

      toast.success('Login successful!');

      navigate('/dashboard');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
};
