import { styled } from 'styled-components';

import { useTodayActivity } from '@/hooks/useTodayAcivity';
import { IBooking } from '@/types/booking';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';
import Spinner from '@/ui/Spinner/Spinner';

import TodayItem from './TodayItem';

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
  overflow: auto;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TodayList = styled.ul`
  grid-area: todayActivity;
  min-width: 42rem;
  width: 100%;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const TodayActivity = () => {
  const { isLoading, todayActivities = [] as IBooking[] } = useTodayActivity();

  return (
    <StyledToday>
      <Row $type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        todayActivities?.length > 0 ? (
          <TodayList>
            {todayActivities.map((activity) => (
              <TodayItem activity={activity as IBooking} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
};

export default TodayActivity;
