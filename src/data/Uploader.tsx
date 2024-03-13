/* eslint-disable no-console */
import { useState } from 'react';

import { styled } from 'styled-components';

import Button from '@/ui/Button/Button';

import {
  deleteBookings,
  deleteGuests,
  deleteCabins,
  createGuests,
  createCabins,
  createBookings,
} from './uploadAllData';

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
