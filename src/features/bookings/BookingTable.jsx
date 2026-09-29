import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import Pagination from "../../ui/Pagination";
import { useBookingsRealtime } from "./useBookingsRealtime";

function BookingTable() {
  useBookingsRealtime();
  const { bookings, total, isLoading, error } = useBookings();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={total} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;
