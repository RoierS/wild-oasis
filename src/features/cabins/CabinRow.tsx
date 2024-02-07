import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import { useCreateCabin } from '@/hooks/useCreateCabin';
import { useDeleteCabin } from '@/hooks/useDeleteCabin';
import { ICabin } from '@/types/cabin';

import ConfirmDelete from '@/ui/ConfirmDelete/ConfirmDelete';
import Menus from '@/ui/Menus/Menus';
import Modal from '@/ui/Modal/Modal';
import Row from '@/ui/Row/Row';
import Table from '@/ui/Table/Table';
import { formatCurrency } from '@/utils/helpers';

import CreateCabinForm from './CreateCabinForm';

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
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin();
  const { createNewCabin } = useCreateCabin();

  const {
    name,
    maxCapacity,
    image,
    regularPrice,
    discount,
    description,
    id: cabinId,
  } = cabin;

  const handleDuplicate = () => {
    createNewCabin({
      name: `${name} copy`,
      maxCapacity,
      image,
      regularPrice,
      discount,
      description,
    });
  };

  return (
    <Table.Row role="row">
      <Img src={`${image}`} alt={`${name}`} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice!)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>

      <Row $type="horizontal">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId ?? null} />

            <Menus.List id={cabinId ?? null}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabin)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Row>
    </Table.Row>
  );
};

export default CabinRow;
