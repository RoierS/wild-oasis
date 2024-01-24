import CabinTable from '@/features/cabins/CabinTable';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Cabins = () => {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row $type="horizontal">
        <CabinTable />
      </Row>
    </>
  );
};

export default Cabins;
