import AddCabin from '@/features/cabins/AddCabin';
import CabinTable from '@/features/cabins/CabinTable';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Cabins = () => {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row $type="vertical">
        <CabinTable />
      </Row>

      <AddCabin />
    </>
  );
};

export default Cabins;
