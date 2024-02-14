import { IBreakfast } from './breakfast';

export interface ICheckin {
  bookingId: number;
  breakfast: IBreakfast;
}
