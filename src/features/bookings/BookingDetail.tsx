import { HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useBooking } from '@/hooks/useBooking';
import { useCheckout } from '@/hooks/useCheckout';
import { useDeleteBooking } from '@/hooks/useDeleteBooking';
import { useMoveBack } from '@/hooks/useMoveBack';
import { IBooking } from '@/types/booking';
import Button from '@/ui/Button/Button';
import ButtonGroup from '@/ui/ButtonGroup/ButtonGroup';
import ButtonText from '@/ui/ButtonText/ButtonText';
import ConfirmDelete from '@/ui/ConfirmDelete/ConfirmDelete';
import Empty from '@/ui/Empty/Empty';
import Heading from '@/ui/Heading/Heading';
import Modal from '@/ui/Modal/Modal';
import Row from '@/ui/Row/Row';
import Spinner from '@/ui/Spinner/Spinner';
import Tag from '@/ui/Tag/Tag';

import BookingDataBox from './BookingDataBox';

type statusToTagName = {
  [key: string]: string;
};

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail: React.FC = () => {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeletingBooking, deleteCurrentBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const handleCheckIn = () => {
    navigate(`/check-in/${bookingId}`);
  };

  const handleCheckOut = () => {
    checkout(bookingId);
  };

  const statusToTagName: statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;

  const typedBooking = booking as IBooking;

  if (!typedBooking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = typedBooking;

  return (
    <>
      <Row $type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>

          {status && (
            <Tag $type={statusToTagName[status]}>
              {status.replace('-', ' ')}
            </Tag>
          )}
        </HeadingGroup>

        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={typedBooking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={handleCheckIn}>Check in</Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={handleCheckOut} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>

        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger">
              <HiTrash />
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteCurrentBooking(bookingId, {
                  onSettled: () => {
                    navigate(-1);
                  },
                });
              }}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
