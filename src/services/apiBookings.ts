import supabase from './supabase';

export interface IFilter {
  field: string;
  value: number | string;
  method?: 'gte';
}

interface getBookingsProps {
  filter: IFilter | null;
  sortBy?: string;
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

  // eslint-disable-next-line no-console
  console.log(sortBy);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};
