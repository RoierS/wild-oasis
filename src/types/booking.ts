import { ICabin } from './cabin';
import { IGuests } from './guests';

export interface IBooking {
  cabinId: number | null;
  cabinPrice: number | null;
  created_at?: string;
  isPaid?: boolean | null;
  endDate: string | null;
  extrasPrice?: number | null;
  guestId: number | null;
  hasBreakfast: boolean | null;
  id: number;
  numGuests: number | null;
  numNights: number | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
  observations: string | null;
  cabins: ICabin;
  guests: IGuests;
}
