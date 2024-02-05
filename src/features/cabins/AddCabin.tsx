import Button from '@/ui/Button/Button';

import Modal from '@/ui/Modal/Modal';

import CreateCabinForm from './CreateCabinForm';

const AddCabin: React.FC = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
