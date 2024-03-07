import AddCabin from '@/features/cabins/AddCabin';
import CabinTable from '@/features/cabins/CabinTable';
import CabinTableOperations from '@/features/cabins/CabinTableOperations';
import useMediaQuery from '@/hooks/useMediaQuery';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Cabins = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <>
      <Row $type={isMobile ? 'vertical' : 'horizontal'}>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <CabinTable />

      <AddCabin />
    </>
  );
};

export default Cabins;
