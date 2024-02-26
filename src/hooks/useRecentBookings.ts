import { useQuery } from '@tanstack/react-query';

import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { NUM_DAYS_TO_SHOW } from '@/constants/constants';
import { getBookingsAfterDate } from '@/services/apiBookings';

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get('last') ?? NUM_DAYS_TO_SHOW;

  const queryDate = subDays(new Date(), Number(numDays)).toISOString();

  const {
    isLoading,
    data: recentBookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { isLoading, recentBookings, error };
};
