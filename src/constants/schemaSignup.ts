import * as yup from 'yup';

import { ISignupForm } from '@/types/signupForm';

import { EMAIL_REGX, LATIN_CHARACTERS_ONLY, NO_WHITESPACE } from './constants';
import { confirmPasswordSchema, newPasswordSchema } from './passwordSchema';
import { validationErrors } from './validationErrors';

export const fullNameSchema = yup
  .string()
  .required(validationErrors.required())
  .matches(LATIN_CHARACTERS_ONLY, validationErrors.latinCharactersOnly())
  .matches(NO_WHITESPACE, validationErrors.fullNameValidation())
  .max(20, validationErrors.max(20, 'Full name'));

export const emailSchema = yup
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
  .matches(EMAIL_REGX, validationErrors.invalidEmailFormat());

export const schemaSignup: yup.ObjectSchema<ISignupForm> = yup
  .object()
  .shape({
    fullName: fullNameSchema,

    email: emailSchema,
    password: newPasswordSchema,
    passwordConfirm: confirmPasswordSchema,
  })
  .required();
