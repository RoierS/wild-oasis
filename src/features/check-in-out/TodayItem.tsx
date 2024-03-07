import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCheckout } from '@/hooks/useCheckout';
import { IBooking } from '@/types/booking';
import Button from '@/ui/Button/Button';
import { Flag } from '@/ui/Flag/Flag';
import SpinnerMini from '@/ui/SpinnerMini/SpinnerMini';
import Tag from '@/ui/Tag/Tag';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns:
    minmax(90px, 1fr) 21px minmax(108px, 1fr) minmax(59px, 1fr)
    minmax(58px, 1fr);

  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const TodayItem = ({ activity }: { activity: IBooking }) => {
  const { guests, numNights, id, status } = activity;
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag $type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag $type="blue">Checked in</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights > 1 ? `${numNights} nights` : `${numNights} night`}</div>

      {status === 'unconfirmed' && (
        <Button
          $size="small"
          $variation="primary"
          onClick={() => navigate(`/check-in/${id}`)}
        >
          Check in
        </Button>
      )}

      {status === 'checked-in' && (
        <Button
          $size="small"
          $variation="danger"
          onClick={() => checkout(id)}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? <SpinnerMini /> : 'Check out'}
        </Button>
      )}
    </StyledTodayItem>
  );
};

export default TodayItem;
