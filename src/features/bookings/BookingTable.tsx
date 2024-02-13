import { useBookings } from '@/hooks/useBooking';
import { IBooking } from '@/types/booking';
import Empty from '@/ui/Empty/Empty';
import Pagination from '@/ui/Pagination/Pagination';
import Spinner from '@/ui/Spinner/Spinner';
import Table from '@/ui/Table/Table';

import BookingRow from './BookingRow';

const BookingTable: React.FC = () => {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="bookings" />;
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
      </Table.Header>

      <Table.Body
        data={bookings as IBooking[]}
        render={(booking: IBooking) => (
          <BookingRow key={booking.id} booking={booking} />
        )}
      />

      <Table.Footer>
        <Pagination count={count || 0} />
      </Table.Footer>
    </Table>
  );
};

export default BookingTable;
