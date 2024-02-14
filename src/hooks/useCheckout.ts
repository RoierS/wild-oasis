import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { updateBooking } from '@/services/apiBookings';

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        active: true,
      } as InvalidateQueryFilters);

      toast.success(`Booking #${data.id} Checked out successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkout, isCheckingOut };
};
