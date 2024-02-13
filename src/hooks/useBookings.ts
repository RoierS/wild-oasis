import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSearchParams } from 'react-router-dom';

import { PAGE_SIZES } from '@/constants/constants';
import { IFilter, getBookings } from '@/services/apiBookings';

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('status');

  const filter: IFilter | null =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sort
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [sortField, sortOrder] = sortValue.split('-');
  const sortBy = {
    sortField,
    sortOrder,
  };

  // Pagination
  const page = Number(searchParams.get('page')) || 1;

  // Query
  const {
    isLoading,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetch
  const pageCount = count ? Math.ceil(count / PAGE_SIZES) : 0;

  // Pre-fetch previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  // Pre-fetch next page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  return { isLoading, bookings, count, error };
};
