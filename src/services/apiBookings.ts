import supabase from './supabase';

export const getBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, numNights, startDate, endDate, status, totalPrice, cabins(name), guests(fullName, email)',
    );

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};
