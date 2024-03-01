import { PAGE_SIZES } from '@/constants/constants';

import { getToday } from '@/utils/helpers';

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

export const getBooking = async (id: number) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be loaded');
  }

  return data;
};

export const updateBooking = async (
  id: number,
  config: {
    status: 'unconfirmed' | 'checked-in' | 'checked-out';
    isPaid?: boolean;
  },
) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(config)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  return data;
};

export const deleteBooking = async (id: number) => {
  if (!id) return;

  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  return data;
};

export const getBookingsAfterDate = async (date: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};

export const getStaysAfterDate = async (date: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};

export const getStaysTodayActivity = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    // only download the data that actually need
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
};
