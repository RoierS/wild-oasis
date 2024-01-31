import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCabin } from '@/services/apiCabins';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createNewCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('New cabin added');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewCabin };
};
