import * as yup from 'yup';

import { ISettings } from '@/types/settings';

import { validationErrors } from './validatioErrors';

export const schemaSettings: yup.ObjectSchema<ISettings> = yup.object().shape({
  minBookingLength: yup
    .number()
    .typeError(validationErrors.required())
    .positive()
    .integer()
    .required(validationErrors.required())
    .min(1, validationErrors.minValue(1, 'nights'))
    .max(30, validationErrors.maxValue(30, 'nights'))
    .test(
      'isLessThanMaxNights',
      validationErrors.isLessThanMaxNights(),
      (value, { parent }) => value <= parent.maxBookingLength,
    ),
  maxBookingLength: yup
    .number()
    .typeError(validationErrors.required())
    .positive()
    .integer()
    .required(validationErrors.required())
    .min(1, validationErrors.minValue(1, 'nights'))
    .max(30, validationErrors.maxValue(30, 'nights'))
    .test(
      'isGreaterThanMinNights',
      validationErrors.isGreaterThanMinNights(),
      (value, { parent }) => value >= parent.minBookingLength,
    ),
  maxGuestsPerBooking: yup
    .number()
    .typeError(validationErrors.required())
    .min(1, validationErrors.minValue(1, 'nights'))
    .positive()
    .integer()
    .required(validationErrors.required())
    .min(1, validationErrors.minValue(1, 'guests per booking'))
    .max(10, validationErrors.maxValue(10, 'guests per booking')),
  breakfastPrice: yup
    .number()
    .typeError(validationErrors.required())
    .min(1, validationErrors.minValue(1, 'nights'))
    .positive()
    .integer()
    .required(validationErrors.required())
    .min(1, validationErrors.minValue(1, 'breakfast price'))
    .max(100, validationErrors.maxValue(100, 'breakfast price')),
});
