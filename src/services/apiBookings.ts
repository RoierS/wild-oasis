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
}

export const getBookings = async ({ filter, sortBy }: getBookingsProps) => {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, numNights, startDate, endDate, status, totalPrice, cabins(name), guests(fullName, email)',
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

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};
