import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import { IBooking } from '@/types/booking';

import { formatCurrency } from '@/utils/helpers';

import Stat from './Stat';

interface StatsProps {
  recentBookings: IBooking[];
  confirmedStays: IBooking[];
  numDays: number;
  cabinCount: number;
}

const Stats: React.FC<StatsProps> = ({
  recentBookings,
  confirmedStays,
  numDays,
  cabinCount,
}) => {
  const numBookings = recentBookings.length;

  const totalSales = recentBookings?.reduce((total, booking) => {
    return total + booking.totalPrice;
  }, 0);

  const numCheckins = confirmedStays.length;

  const checkedInNights = confirmedStays.reduce((total, booking) => {
    return total + booking.numNights;
  }, 0);

  const occupationRate = Math.round(
    (checkedInNights / (numDays * cabinCount)) * 100,
  );

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(totalSales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        value={numCheckins}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        value={`${occupationRate}%`}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
