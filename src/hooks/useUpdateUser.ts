import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { updateCurrentUser } from '@/services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });

      toast.success('User account successfully updated');
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateUser };
};
