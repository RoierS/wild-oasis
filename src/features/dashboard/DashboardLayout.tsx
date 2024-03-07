import { styled } from 'styled-components';

import TodayActivity from '@/features/check-in-out/TodayActivity';
import { useCabins } from '@/hooks/useCabins';
import { useRecentBookings } from '@/hooks/useRecentBookings';

import { useRecentStays } from '@/hooks/useRecentStays';
import { IBooking } from '@/types/booking';
import Empty from '@/ui/Empty/Empty';
import Spinner from '@/ui/Spinner/Spinner';

import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-areas:
    'bookings sales check-ins occupancy-rate'
    'todayActivity todayActivity durationChart  durationChart'
    'salesChart salesChart salesChart salesChart';
  gap: 2.4rem;
  grid-auto-columns: 1fr;

  @media screen and (max-width: 1280px) {
    grid-template-areas:
      'bookings check-ins'
      'occupancy-rate sales'
      'todayActivity todayActivity'
      'durationChart durationChart'
      'salesChart salesChart';
    gap: 1.4rem;
  }
  @media screen and (max-width: 620px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2vw;
  }
`;

const DashboardLayout: React.FC = () => {
  const { isLoading: isRecentBookingsLoading, recentBookings } =
    useRecentBookings();

  const {
    confirmedStays,
    numDays,
    isLoading: isStaysLoading,
  } = useRecentStays();

  const { isLoading: isCabinsLoading, cabins } = useCabins();

  const isWorking =
    isRecentBookingsLoading || isStaysLoading || isCabinsLoading;

  if (isWorking) return <Spinner />;

  if (
    (!recentBookings || !recentBookings.length) &&
    (!confirmedStays || !confirmedStays.length) &&
    (!cabins || !cabins.length)
  )
    return <Empty resourceName="dashboard" />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings as IBooking[]}
        confirmedStays={confirmedStays as IBooking[]}
        numDays={Number(numDays)}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays as IBooking[]} />
      <SalesChart
        recentBookings={recentBookings as IBooking[]}
        numDays={Number(numDays)}
      />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
