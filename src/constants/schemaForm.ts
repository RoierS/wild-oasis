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
      .min(1, validationErorrs.minCapacity(1))
      .max(10, validationErorrs.maxCapacity(10)),
    regularPrice: yup
      .number()
      .typeError(validationErorrs.required())
      .required(validationErorrs.required())
      .positive(({ value }) => `The price cant be ${value}`)
      .integer(),
    discount: yup
      .number()
      .typeError(validationErorrs.required())
      .required(validationErorrs.required())
      .integer()
      .test(
        'isLessThanRegularPrice',
        validationErorrs.lessThanRegularPrice(),
        (value, { parent }) => value <= parent.regularPrice,
      ),
    description: yup.string().required(validationErorrs.required()),
  })
  .required();
