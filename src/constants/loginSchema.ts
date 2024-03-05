import * as yup from 'yup';

import { newPasswordSchema } from './passwordSchema';
import { emailSchema } from './schemaSignup';

export const loginSchema = yup
  .object()
  .shape({
    email: emailSchema,
    password: newPasswordSchema,
  })
  .required();
