import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { FaEyeSlash, FaEye } from 'react-icons/fa';

import { yupResolver } from '@hookform/resolvers/yup';

import { passwordSchema } from '@/constants/passwordSchema';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Button from '@/ui/Button/Button';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import InputWrapper from '@/ui/InputWrapper/InputWrapper';

interface IUpdatePasswordForm {
  password: string;
  passwordConfirm: string;
}

const UpdatePasswordForm: React.FC = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdatePasswordForm>({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<IUpdatePasswordForm> = ({ password }) => {
    if (password) {
      updateUser({ password }, { onSuccess: () => reset() });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        labelName="New Password"
        errorMessage={errors?.password?.message}
      >
        <InputWrapper>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register('password')}
          />
          <Button
            $variation="togglePassword"
            type="button"
            onClick={() => setIsShowPassword((prev) => !prev)}
          >
            {isShowPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputWrapper>
      </FormRow>

      <FormRow
        labelName="Confirm new password"
        errorMessage={errors?.passwordConfirm?.message}
      >
        <InputWrapper>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register('passwordConfirm')}
          />
          <Button
            $variation="togglePassword"
            type="button"
            onClick={() => setIsShowPassword((prev) => !prev)}
          >
            {isShowPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputWrapper>
      </FormRow>

      <FormRow>
        <Button
          onClick={() => reset()}
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  );
};

export default UpdatePasswordForm;
