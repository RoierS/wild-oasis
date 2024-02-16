import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { schemaSignup } from '@/constants/schemaSignup';
import { useSignup } from '@/hooks/useSignup';
import Button from '@/ui/Button/Button';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';

export interface ISignupForm {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignupForm>({
    resolver: yupResolver(schemaSignup),
    mode: 'onChange',
  });
  const { signup, isSigningUp } = useSignup();

  const onSubmit: SubmitHandler<ISignupForm> = ({
    fullName,
    email,
    password,
  }) => {
    signup(
      {
        fullName,
        email,
        password,
      },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Full name" errorMessage={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName')}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow labelName="Email address" errorMessage={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email')}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        labelName="Password (min 8 characters)"
        errorMessage={errors?.password?.message}
      >
        <Input
          type="text"
          id="password"
          {...register('password')}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        labelName="Repeat password"
        errorMessage={errors?.passwordConfirm?.message}
      >
        <Input
          type="text"
          id="passwordConfirm"
          {...register('passwordConfirm')}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSigningUp}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
