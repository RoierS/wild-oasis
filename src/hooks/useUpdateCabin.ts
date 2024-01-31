import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCabin } from '@/services/apiCabins';

export const useUpdateCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateExistCabin } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Cabin updated');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateExistCabin };
};
