import { IBooking } from '@/types/booking';

interface IStartData {
  duration: string;
  value: number;
  color: string;
}

export const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: 'var(--color-1-night)',
  },
  {
    duration: '2 nights',
    value: 0,
    color: 'var(--color-2-nights)',
  },
  {
    duration: '3 nights',
    value: 0,
    color: 'var(--color-3-nights)',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: 'var(--color-4-5-nights)',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: 'var(--color-6-7-nights)',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: 'var(--color-8-14-nights)',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: 'var(--color-15-21-nights)',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: 'var(--color-21-nights)',
  },
];

export const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: 'var(--color-dark-1-night)',
  },
  {
    duration: '2 nights',
    value: 0,
    color: 'var(--color-dark-2-nights)',
  },
  {
    duration: '3 nights',
    value: 0,
    color: 'var(--color-dark-3-nights)',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: 'var(--color-dark-4-5-nights)',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: 'var(--color-dark-6-7-nights)',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: 'var(--color-dark-8-14-nights)',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: 'var(--color-dark-15-21-nights)',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: 'var(--color-dark-21-nights)',
  },
];

export const prepareData = (startData: IStartData[], stays: IBooking[]) => {
  const incArrayValue = (arr: IStartData[], field: string) => {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  };

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
};
