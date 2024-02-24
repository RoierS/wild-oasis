import * as yup from 'yup';

import { IUpdateUserDataForm } from '@/types/updateUserDataForm';

import { fullNameSchema } from './schemaSignup';

export const updateUserDataSchema: yup.ObjectSchema<IUpdateUserDataForm> =
  yup.object({
    fullName: fullNameSchema,
    avatar: yup.mixed<string | File>().optional(),
  });
