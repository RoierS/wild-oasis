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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
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
