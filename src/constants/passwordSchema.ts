import * as yup from 'yup';

import { validationErrors } from '@/constants/validationErrors';

export const updatePasswordSchema = yup
  .object({
    password: yup
      .string()
      .required(validationErrors.required())
      .matches(/[A-Z]/, validationErrors.uppercase())
      .matches(/[a-z]/, validationErrors.lowercase())
      .matches(/\d/, validationErrors.oneDigit())
      .matches(/[!@#$%^&*]/, validationErrors.specialChar())
      .test(
        'noWhitespace',
        validationErrors.noWhitespace(),
        (value) => !value.includes(' '),
      )
      .min(8, validationErrors.min(8)),
    passwordConfirm: yup
      .string()
      .required(validationErrors.confirmPassword())
      .oneOf([yup.ref('password')], validationErrors.passwordMatch()),
  })
  .required();
