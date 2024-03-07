import { format, isToday } from 'date-fns';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { useCheckout } from '@/hooks/useCheckout';
import { useDeleteBooking } from '@/hooks/useDeleteBooking';
import { IBooking } from '@/types/booking';
import ConfirmDelete from '@/ui/ConfirmDelete/ConfirmDelete';
import Menus from '@/ui/Menus/Menus';
import Modal from '@/ui/Modal/Modal';
import Table from '@/ui/Table/Table';

import Tag from '@/ui/Tag/Tag';

import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';

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
`;

const StackedSpanIn = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.4rem;
  font-weight: 500;
`;

const StackedSpanDate = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.4rem;
  color: var(--color-grey-500);
  font-size: 1.2rem;
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
    id: bookingId,
  } = booking;
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const { isDeletingBooking, deleteCurrentBooking } = useDeleteBooking();

  const handleView = () => {
    navigate(`/bookings/${bookingId}`);
  };

  const handleCheckIn = () => {
    navigate(`/check-in/${bookingId}`);
  };

  const handleCheckOut = () => {
    checkout(bookingId);
  };

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
        <StackedSpanIn>
          <span>
            {isToday(new Date(startDate ?? 0))
              ? 'Today'
              : formatDistanceFromNow(startDate!)}{' '}
          </span>
          <span>→</span>
          <span> {numNights} night stay</span>
        </StackedSpanIn>
        <StackedSpanDate>
          <span>
            {format(new Date(startDate ?? 0), 'dd MMM yyyy')} &mdash;{' '}
          </span>
          <span>{format(new Date(endDate ?? 0), 'dd MMM yyyy')}</span>
        </StackedSpanDate>
      </Stacked>

      <Tag $type={statusToTagName[status!]}>{status?.replace('-', ' ')}</Tag>

      <Amount>{totalPrice && formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button onClick={handleView} icon={<HiEye />}>
              Details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                onClick={handleCheckIn}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                onClick={handleCheckOut}
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteCurrentBooking(bookingId);
              }}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
