import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'react-router-dom';

import { IFilter, getBookings } from '@/services/apiBookings';

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('status');

  const filter: IFilter | null =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, bookings, error };
};
