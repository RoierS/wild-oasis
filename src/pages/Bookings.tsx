import BookingTable from '@/features/bookings/BookingTable';
import BookingTableOperations from '@/features/bookings/BookingTableOperations';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Bookings = () => {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
};

export default Bookings;
