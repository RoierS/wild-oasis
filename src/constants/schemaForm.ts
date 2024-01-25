import * as yup from 'yup';

import { validationErorrs } from './validatioErrors';

export const schemaForm = yup
  .object({
    name: yup.string().required(validationErorrs.required()),
    maxCapacity: yup
      .number()
      .typeError(validationErorrs.required())
      .positive()
      .integer()
      .required(validationErorrs.required())
      .min(1, validationErorrs.minValue(1, 'capacity'))
      .max(10, validationErorrs.maxValue(10, 'capacity')),
    regularPrice: yup
      .number()
      .typeError(validationErorrs.required())
      .required(validationErorrs.required())
      .min(1, validationErorrs.minValue(1, 'price'))
      .integer(),
    discount: yup
      .number()
      .typeError(validationErorrs.required())
      .required(validationErorrs.required())
      .integer()
      .min(0, validationErorrs.minValue(0, 'discount'))
      .test(
        'isLessThanRegularPrice',
        validationErorrs.lessThanRegularPrice(),
        (value, { parent }) => value <= parent.regularPrice,
      ),
    description: yup.string().required(validationErorrs.required()),
  })
  .required();
