/* eslint-disable no-console */
import { isFuture, isPast, isToday } from 'date-fns';

import supabase from '@/services/supabase';

import { subtractDates } from '@/utils/helpers';

import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

export const deleteGuests = async () => {
  const { error } = await supabase.from('guests').delete().gt('id', 0);

  if (error) console.log(error.message);
};

export const deleteCabins = async () => {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);

  if (error) console.log(error.message);
};

export const deleteBookings = async () => {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);

  if (error) console.log(error.message);
};

export const createGuests = async () => {
  const { error } = await supabase.from('guests').insert(guests);

  if (error) console.log(error.message);
};

export const createCabins = async () => {
  const { error } = await supabase.from('cabins').insert(cabins);

  if (error) console.log(error.message);
};

export const createBookings = async () => {
  // Get all guestIds and cabinIds, and then replace the original IDs
  // in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');

  const allGuestIds = guestsIds?.map((cabin) => cabin.id);

  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id');

  const allCabinIds = cabinsIds?.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);

    const cabinPrice = cabin
      ? numNights * (cabin.regularPrice - cabin.discount)
      : 0;

    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;

    const totalPrice = cabinPrice + extrasPrice;

    let status;

    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';

    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';

    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds?.at(booking.guestId - 1),
      cabinId: allCabinIds?.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);

  if (error) console.log(error.message);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function uploadAllData() {
  // Bookings need to be deleted FIRST
  await deleteBookings();
  await deleteGuests();
  await deleteCabins();

  // Bookings need to be created LAST
  await createGuests();
  await createCabins();
  await createBookings();
}
