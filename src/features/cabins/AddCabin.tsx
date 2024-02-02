import { useState } from 'react';

import Button from '@/ui/Button/Button';
import Modal from '@/ui/Modal/Modal';
import Row from '@/ui/Row/Row';

import CreateCabinForm from './CreateCabinForm';

const AddCabin: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Row $type="vertical">
      <Button
        $size="medium"
        $variation="primary"
        onClick={() => setIsOpenModal((show) => !show)}
      >
        Add new cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </Row>
  );
};

export default AddCabin;
