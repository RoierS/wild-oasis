import { format, isToday } from 'date-fns';
import { styled } from 'styled-components';

import Table from '@/ui/Table/Table';

import Tag from '@/ui/Tag/Tag';

import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';

import { IBooking } from './BookingTable';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

interface IBookingrowProps {
  booking: IBooking;
}

const BookingRow: React.FC<IBookingrowProps> = ({ booking }) => {
  const {
    cabins: { name: cabinName },
    guests: { fullName: fullGuestName, email },
    startDate,
    endDate,
    status,
    numNights,
    totalPrice,
  } = booking;

  type statusToTagName = {
    [key: string]: string;
  };

  const statusToTagName: statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullGuestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate ?? 0))
            ? 'Today'
            : formatDistanceFromNow(startDate!)}{' '}
          → {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate ?? 0), 'dd MMM yyyy')} &mdash;{' '}
          {format(new Date(endDate ?? 0), 'dd MMM yyyy')}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[status!]}>{status?.replace('-', ' ')}</Tag>

      <Amount>{totalPrice && formatCurrency(totalPrice)}</Amount>
    </Table.Row>
  );
};

export default BookingRow;
