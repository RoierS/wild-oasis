import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

import { updateBooking } from '@/services/apiBookings';
import { ICheckin } from '@/types/checkin';

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: ICheckin) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        active: true,
      } as InvalidateQueryFilters);

      toast.success(`Booking #${data.id} Checked in successfully`);

      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkin, isCheckingIn };
};
