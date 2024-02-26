import { styled } from 'styled-components';

import { useRecentBookings } from '@/hooks/useRecentBookings';
import { useRecentStays } from '@/hooks/UseResentStays';
import Spinner from '@/ui/Spinner/Spinner';

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
    recentStays,
    isLoading: isStaysLoading,
  } = useRecentStays();

  if (isRecentBookingsLoading || isStaysLoading) return <Spinner />;

  // TODO: Display statistics
  // eslint-disable-next-line no-console
  console.log(recentBookings);
  // eslint-disable-next-line no-console
  console.log(confirmedStays, recentStays);

  return (
    <StyledDashboardLayout>
      <div>Stats</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
