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

  // SORT
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [sortField, sortOrder] = sortValue.split('-');
  const sortBy = {
    sortField,
    sortOrder,
  };

  // Pagination
  const page = Number(searchParams.get('page')) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings: data?.bookings, count: data?.count, error };
};
