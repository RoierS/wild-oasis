import * as yup from 'yup';

import { ISignupForm } from '@/features/authentication/SignupForm';

import { EMAIL_REGX, LATIN_CHARACTERS_ONLY, NO_WHITESPACE } from './constants';
import { validationErrors } from './validationErrors';

export const schemaSignup: yup.ObjectSchema<ISignupForm> = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .required(validationErrors.required())
      .matches(LATIN_CHARACTERS_ONLY, validationErrors.latinCharactersOnly())
      .matches(NO_WHITESPACE, validationErrors.fullNameValidation())
      .max(20, validationErrors.max(20, 'Full name')),

    email: yup
      .string()
      .required(validationErrors.required())
      .test(
        'noWhitespace',
        validationErrors.noWhitespace(),
        (value) => !value.includes(' '),
      )
      .test('hasAtSymbol', validationErrors.missingAtSymbol(), (value) =>
        value.includes('@'),
      )
      .test('hasDomain', validationErrors.missingDomain(), (value) => {
        const emailParts = value.split('@');
        return emailParts.length === 2 && emailParts[1].trim() !== '';
      })
      .matches(EMAIL_REGX, validationErrors.invalidEmailFormat()),

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
