import * as yup from 'yup';

import { IUpdateUserDataForm } from '@/types/updateUserDataForm';

import { LATIN_CHARACTERS_ONLY, NO_WHITESPACE } from './constants';
import { validationErrors } from './validationErrors';

export const updateUserDataSchema: yup.ObjectSchema<IUpdateUserDataForm> =
  yup.object({
    fullName: yup
      .string()
      .required(validationErrors.required())
      .matches(LATIN_CHARACTERS_ONLY, validationErrors.latinCharactersOnly())
      .matches(NO_WHITESPACE, validationErrors.fullNameValidation())
      .max(20, validationErrors.max(20, 'Full name')),
    avatar: yup.mixed<string | File>().optional(),
  });
