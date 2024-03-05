import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { useSearchParams } from 'react-router-dom';

import { PAGE_SIZES } from '@/constants/constants';
import {
  deleteBooking,
  getBookings,
  getBookingsRowsCount,
} from '@/services/apiBookings';

export const useDeleteBooking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { isPending: isDeletingBooking, mutate: deleteCurrentBooking } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ['bookings'],
        });
        const currentPage = Number(searchParams.get('page')) || 1;
        const filterValue = searchParams.get('status');
        const filter =
          !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue };

        const count = await queryClient.fetchQuery({
          queryKey: ['bookingsCount'],
          queryFn: () => getBookingsRowsCount({ filter }),
        });

        if (
          count &&
          Math.ceil(count / PAGE_SIZES) < currentPage &&
          currentPage > 1
        ) {
          searchParams.set('page', String(currentPage - 1));
          setSearchParams(searchParams);

          queryClient.invalidateQueries({
            queryKey: ['bookings', filter, count],
          });

          queryClient.prefetchQuery({
            queryKey: ['bookings', filter, currentPage - 1],
            queryFn: () => getBookings({ filter, page: currentPage - 1 }),
          });
        }

        toast.success('Booking deleted');
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDeletingBooking, deleteCurrentBooking };
};
