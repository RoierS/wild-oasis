export const validationErorrs = {
  required: () => 'This field is required',
  digit: () => 'This field must contain numbers',
  minCapacity: (count: number) => `Minimum capacity must be at least ${count}`,
  maxCapacity: (count: number) => `Maximun should be less than ${count}`,
  lessThanRegularPrice: () =>
    'Discount cannot be greater than the regular price',
};
