import { PAGE_SIZES } from '@/constants/constants';

import supabase from './supabase';

export interface IFilter {
  field: string;
  value: number | string;
  method?: 'gte';
}

interface getBookingsProps {
  filter: IFilter | null;
  sortBy?: {
    sortField: string;
    sortOrder: string;
  };
  page: number;
}

export const getBookings = async ({
  filter,
  sortBy,
  page,
}: getBookingsProps) => {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, numNights, startDate, endDate, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' },
    );

  // Filter
  if (filter) {
    const { method, field, value } = filter;
    query = method ? query.gte(field, value) : query.eq(field, value);
  }

  // Sort
  if (sortBy) {
    const { sortField, sortOrder } = sortBy;
    query = query.order(sortField, { ascending: sortOrder === 'asc' });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZES;
    const to = page * PAGE_SIZES - 1;

    query = query.range(from, to);
  }

  const { data: bookings, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { bookings, count };
};
