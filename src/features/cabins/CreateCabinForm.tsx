import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { schemaForm } from '@/constants/schemaForm';
import { useCreateCabin } from '@/hooks/useCreateCabin';
import { useUpdateCabin } from '@/hooks/useUpdateCabin';
import { ICabin } from '@/types/cabin';
import Button from '@/ui/Button/Button';
import FileInput from '@/ui/FileInput/FileInput';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import Textarea from '@/ui/Textarea/Textarea';

interface CreateCabinFormProps {
  cabinToEdit?: ICabin;
  onCloseModal?: () => void;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabinToEdit: editValues,
  onCloseModal,
}) => {
  const isInEditMode = Boolean(editValues?.id);

  const { isCreating, createNewCabin } = useCreateCabin();
  const { isUpdating, updateExistCabin } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<ICabin>({
    resolver: yupResolver(schemaForm),
    mode: 'onChange',
    defaultValues: isInEditMode ? editValues : {},
  });

  const onSubmit: SubmitHandler<ICabin> = (data) => {
    const imageFile =
      data.image instanceof FileList && data.image.length > 0
        ? data.image[0]
        : editValues?.image;

    const cabinData = {
      ...data,
      image: imageFile,
    };

    const config = {
      onSuccess: () => {
        onCloseModal?.();
        reset();
      },
    };

    isInEditMode
      ? updateExistCabin(cabinData, config)
      : createNewCabin(cabinData, config);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow labelName="Cabin name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name')}
        />
      </FormRow>

      <FormRow
        labelName="Maximum capacity"
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity')}
        />
      </FormRow>

      <FormRow
        labelName="Regular price"
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            onChange: () => trigger(['discount', 'regularPrice']),
          })}
        />
      </FormRow>

      <FormRow labelName="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            onChange: () => trigger(['discount', 'regularPrice']),
          })}
        />
      </FormRow>

      <FormRow
        labelName="Description for website"
        errorMessage={errors?.description?.message}
      >
        <Textarea type="text" id="description" {...register('description')} />
      </FormRow>

      <FormRow labelName="Cabin photo" errorMessage={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>

        <Button $variation="secondary" disabled={isWorking} type="submit">
          {isInEditMode
            ? isUpdating
              ? 'Updating...'
              : 'Edit cabin'
            : isCreating
              ? 'Creating cabin...'
              : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
