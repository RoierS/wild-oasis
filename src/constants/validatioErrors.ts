export const validationErorrs = {
  required: () => 'This field is required',
  digit: () => 'This field must contain numbers',
  minValue: (count: number, valueName: string) =>
    `Minimum ${valueName} must be at least ${count}`,
  maxValue: (count: number, valueName: string) =>
    `Maximun ${valueName} should be less than ${count}`,
  lessThanRegularPrice: () =>
    'Discount cannot be greater than the regular price',
};
