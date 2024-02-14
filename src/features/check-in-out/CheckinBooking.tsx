import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useBooking } from '@/hooks/useBooking';
import { useCheckin } from '@/hooks/useCheckin';
import { useMoveBack } from '@/hooks/useMoveBack';
import { useSettings } from '@/hooks/useSettings';
import { IBooking } from '@/types/booking';
import { IBreakfast } from '@/types/breakfast';
import Button from '@/ui/Button/Button';
import ButtonGroup from '@/ui/ButtonGroup/ButtonGroup';
import ButtonText from '@/ui/ButtonText/ButtonText';
import CheckBox from '@/ui/CheckBox/CheckBox';
import Empty from '@/ui/Empty/Empty';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

import Spinner from '@/ui/Spinner/Spinner';

import { formatCurrency } from '@/utils/helpers';

import BookingDataBox from '../bookings/BookingDataBox';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [isConfirmedPaid, setIsConfirmedPaid] = useState(false);
  const [isAddBreakfast, setIsAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings: { breakfastPrice } = {}, isLoading: isLoadingSettings } =
    useSettings();

  useEffect(() => {
    setIsConfirmedPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const typedBooking = booking as IBooking;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = typedBooking;

  const optionalBreakfastPrice = breakfastPrice
    ? breakfastPrice * numNights * numGuests
    : 0;

  const totalWithBreakfast = isAddBreakfast
    ? totalPrice + optionalBreakfastPrice
    : totalPrice;

  if (!booking) return <Empty resourceName="booking" />;

  const handleCheckin = () => {
    if (!isConfirmedPaid) return;

    if (isAddBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalWithBreakfast,
        },
      });
    } else {
      checkin({
        bookingId,
        breakfast: {} as IBreakfast,
      });
    }
  };

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={typedBooking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={isAddBreakfast}
            onChange={() => {
              setIsAddBreakfast((breakfast) => !breakfast);
              setIsConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Add a breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={isConfirmedPaid}
          onChange={() => setIsConfirmedPaid((confirmed) => !confirmed)}
          id="confirm"
          disabled={isConfirmedPaid || isCheckingIn}
        >
          {`I confirm that ${guests?.fullName} has paid the total amount of ${formatCurrency(totalWithBreakfast)} ${isAddBreakfast ? `(${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})` : ''}`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!isConfirmedPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
