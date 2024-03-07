import BookingTable from '@/features/bookings/BookingTable';
import BookingTableOperations from '@/features/bookings/BookingTableOperations';
import useMediaQuery from '@/hooks/useMediaQuery';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Bookings = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <Row $type={isMobile ? 'vertical' : 'horizontal'}>
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
};

export default Bookings;
