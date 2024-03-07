import { useBookings } from '@/hooks/useBookings';
import { IBooking } from '@/types/booking';
import Empty from '@/ui/Empty/Empty';
import Menus from '@/ui/Menus/Menus';
import Pagination from '@/ui/Pagination/Pagination';
import Spinner from '@/ui/Spinner/Spinner';
import Table from '@/ui/Table/Table';

import BookingRow from './BookingRow';

const BookingTable: React.FC = () => {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="54px 139px 1.5fr minmax(103px, 1fr) minmax(83px, 1fr) 17px">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
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
    </Menus>
  );
};

export default BookingTable;
