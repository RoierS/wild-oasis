import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { NUM_DAYS_TO_SHOW } from '@/constants/constants';
import { getStaysAfterDate } from '@/services/apiBookings';

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get('last') ?? NUM_DAYS_TO_SHOW;

  const queryDate = subDays(new Date(), Number(numDays)).toISOString();

  const {
    isLoading,
    data: recentStays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  return { isLoading, confirmedStays, recentStays, error };
};
