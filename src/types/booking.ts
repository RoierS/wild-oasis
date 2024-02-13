import { ICabin } from './cabin';
import { IGuests } from './guests';

export interface IBooking {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  isPaid: boolean;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  numGuests: number;
  numNights: number;
  startDate: string;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  totalPrice: number;
  observations: string | null;
  cabins: ICabin;
  guests: IGuests;
}
