import * as yup from 'yup';

import { ICabin } from '@/types/cabin';

import { validationErrors } from './validatioErrors';

export const schemaForm: yup.ObjectSchema<ICabin> = yup
  .object()
  .shape({
    name: yup.string().required(validationErrors.required()),
    maxCapacity: yup
      .number()
      .typeError(validationErrors.required())
      .positive()
      .integer()
      .required(validationErrors.required())
      .min(1, validationErrors.minValue(1, 'capacity'))
      .max(10, validationErrors.maxValue(10, 'capacity')),
    regularPrice: yup
      .number()
      .typeError(validationErrors.required())
      .required(validationErrors.required())
      .min(1, validationErrors.minValue(1, 'price'))
      .integer(),
    discount: yup
      .number()
      .typeError(validationErrors.required())
      .required(validationErrors.required())
      .integer()
      .min(0, validationErrors.minValue(0, 'discount'))
      .test(
        'isLessThanRegularPrice',
        validationErrors.lessThanRegularPrice(),
        (value, { parent }) => value <= parent.regularPrice,
      ),
    description: yup.string().required(validationErrors.required()),
    id: yup.number().optional(),
    image: yup
      .mixed<FileList>()
      .test('isImageAdded', 'Please add an image', (value, { parent }) => {
        if (value instanceof FileList && value.length > 0) {
          return true;
        }
        if (
          (parent.id && typeof value === 'string') ||
          (parent.id && value?.length === 0)
        ) {
          return true;
        }
        return false;
      })
      .required(validationErrors.required()),
  })
  .required();
