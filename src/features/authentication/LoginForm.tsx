import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { FaEyeSlash } from 'react-icons/fa';

import { FaEye } from 'react-icons/fa6';

import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/constants/loginSchema';
import { useLogin } from '@/hooks/useLogin';
import Button from '@/ui/Button/Button';
import Form from '@/ui/Form/Form';
import FormRowVertical from '@/ui/FormRowVertical/FormRowVertical';
import Input from '@/ui/Input/Input';
import InputWrapper from '@/ui/InputWrapper/InputWrapper';
import SpinnerMini from '@/ui/SpinnerMini/SpinnerMini';

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { login, isLoggingIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'test@gmail.com', // Test user
      password: 'Qwerty1!', // Test user
    },
  });

  const onSubmit = ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          disabled={isLoggingIn}
          {...register('email')}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <InputWrapper>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            {...register('password')}
            disabled={isLoggingIn}
          />
          <Button
            $variation="togglePassword"
            type="button"
            onClick={() => setIsShowPassword((prev) => !prev)}
          >
            {isShowPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputWrapper>
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoggingIn} $size="large">
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
