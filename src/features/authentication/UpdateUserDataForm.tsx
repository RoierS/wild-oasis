import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { updateUserDataSchema } from '@/constants/updateUserDataSchema';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { useUser } from '@/hooks/useUser';
import { IUpdateUserDataForm } from '@/types/updateUserDataForm';
import { IUserData } from '@/types/userData';
import Button from '@/ui/Button/Button';
import FileInput from '@/ui/FileInput/FileInput';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import { Avatar } from '@/ui/UserAvatar/UserAvatar';

const UpdateUserDataForm: React.FC = () => {
  const { userData } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    email,
    user_metadata: { fullName: currentFullName, avatar: currentAvatar },
  } = userData as IUserData;

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IUpdateUserDataForm>({
    resolver: yupResolver(updateUserDataSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: currentFullName,
      avatar: currentAvatar,
    },
  });

  const onSubmit = (formData: IUpdateUserDataForm) => {
    const { fullName, avatar } = formData;
    const updateOptions = {
      onSuccess: () => {
        reset();
        setAvatarPreview(null);
        setValue('fullName', fullName);
      },
    };

    if (avatar && typeof avatar !== 'string') {
      updateUser(
        {
          fullName,
          avatar,
        },
        updateOptions,
      );
    }

    if (typeof avatar === 'string' || !avatar) {
      updateUser(
        {
          fullName,
        },
        updateOptions,
      );
    }
  };

  const handleCancel = () => {
    reset();
    setValue('fullName', currentFullName || '');
    setAvatarPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setAvatarPreview(imageUrl);
      setValue('avatar', selectedFile);
    } else if (currentAvatar) {
      setAvatarPreview(null);
      setValue('avatar', currentAvatar);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow labelName="Full name" errorMessage={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isUpdating}
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Avatar image" errorMessage={errors?.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => handleFileChange(e)}
        />
        {avatarPreview && (
          <Avatar
            alt={
              currentFullName ? `Avatar of ${currentFullName}` : 'User Avatar'
            }
            src={avatarPreview}
          />
        )}
      </FormRow>

      <FormRow>
        <Button
          type="button"
          $variation="secondary"
          onClick={handleCancel}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update account'}
        </Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
