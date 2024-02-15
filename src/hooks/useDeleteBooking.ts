import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { deleteBooking } from '@/services/apiBookings';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeletingBooking, mutate: deleteCurrentBooking } =
    useMutation({
      mutationFn: deleteBooking,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['bookings'],
        });

        toast.success('Booking deleted');
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDeletingBooking, deleteCurrentBooking };
};
