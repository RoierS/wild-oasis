import { ChangeEvent } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { schemaSignup } from '@/constants/schemaSignup';
import { validationErrors } from '@/constants/validationErrors';
import { useSignup } from '@/hooks/useSignup';
import { checkEmailExistence } from '@/services/apiAuth';
import { ISignupForm } from '@/types/signupForm';
import Button from '@/ui/Button/Button';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ISignupForm>({
    resolver: yupResolver(schemaSignup),
    mode: 'onChange',
  });
  const { signup, isSigningUp } = useSignup();

  const onSubmit: SubmitHandler<ISignupForm> = async ({
    fullName,
    email,
    password,
  }) => {
    const isEmailExist = await checkEmailExistence(email);

    if (isEmailExist) {
      setError('email', {
        type: 'manual',
        message: validationErrors.emailExists(),
      });
      return;
    }

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

  const handleEmailExistenceOnBlur = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (errors?.email?.message) {
      return;
    }

    const isEmailExist = await checkEmailExistence(e.target.value);

    if (isEmailExist) {
      setError('email', {
        type: 'manual',
        message: validationErrors.emailExists(),
      });
    }
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
          onBlur={handleEmailExistenceOnBlur}
        />
      </FormRow>

      <FormRow
        labelName="Password (min 8 characters)"
        errorMessage={errors?.password?.message}
      >
        <Input
          type="password"
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
          type="password"
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
