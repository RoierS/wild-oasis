import { useState } from 'react';

import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

import { useDeleteCabin } from '@/hooks/useDeleteCabin';
import { ICabin } from '@/types/cabin';
import Button from '@/ui/Button/Button';
import Row from '@/ui/Row/Row';
import { formatCurrency } from '@/utils/helpers';

import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: ICabin;
}

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const [isShowForm, setIsShowForm] = useState(false);
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin();

  const { name, maxCapacity, image, regularPrice, discount } = cabin;

  return (
    <>
      <TableRow role="row">
        <Img src={`${image}`} alt={`${name}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice!)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <Row $type="horizontal">
          <Button
            $size="small"
            $variation="primary"
            disabled={isDeleting}
            onClick={() => {
              setIsShowForm((show) => !show);
            }}
          >
            Edit
          </Button>
          <Button
            $size="small"
            $variation="danger"
            onClick={() => {
              deleteCabin(cabin);
            }}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : <MdDelete />}
          </Button>
        </Row>
      </TableRow>

      {isShowForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;
