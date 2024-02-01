import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSettings } from '@/services/apiSettings';

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateExistSettings } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });

      toast.success('Settings successfully updated');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateExistSettings };
};
