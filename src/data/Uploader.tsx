/* eslint-disable no-console */
import { useState } from 'react';

import { isFuture, isPast, isToday } from 'date-fns';

import { styled } from 'styled-components';

import supabase from '@/services/supabase';

import Button from '@/ui/Button/Button';
import { subtractDates } from '@/utils/helpers';

import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const deleteGuests = async () => {
  const { error } = await supabase.from('guests').delete().gt('id', 0);

  if (error) console.log(error.message);
};

const deleteCabins = async () => {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);

  if (error) console.log(error.message);
};

const deleteBookings = async () => {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);

  if (error) console.log(error.message);
};

const createGuests = async () => {
  const { error } = await supabase.from('guests').insert(guests);

  if (error) console.log(error.message);
};

const createCabins = async () => {
  const { error } = await supabase.from('cabins').insert(cabins);

  if (error) console.log(error.message);
};

const createBookings = async () => {
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

const StyledDiv = styled.div`
  margin-top: auto;
  background-color: #e0e7ff;
  padding: 8px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  const uploadBookings = async () => {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  };

  return (
    <StyledDiv>
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </StyledDiv>
  );
};

export default Uploader;
