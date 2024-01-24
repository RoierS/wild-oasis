import { useState } from 'react';

import CabinTable from '@/features/cabins/CabinTable';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';
import Button from '@/ui/Button/Button';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Cabins = () => {
  const [isShowForm, setIsShowFrom] = useState(false);

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row $type="vertical">
        <CabinTable />
      </Row>

      <Row $type="vertical">
        <Button
          $size="medium"
          $variation="primary"
          onClick={() => setIsShowFrom(!isShowForm)}
        >
          Add new cabin
        </Button>

        {isShowForm && <CreateCabinForm />}
      </Row>
    </>
  );
};

export default Cabins;
