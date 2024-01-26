import { SubmitHandler, useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { schemaForm } from '@/constants/schemaForm';
import { createCabin } from '@/services/apiCabins';
import { IFormData } from '@/types/formData';
import Button from '@/ui/Button/Button';
import FileInput from '@/ui/FileInput/FileInput';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import Textarea from '@/ui/Textarea/Textarea';

const CreateCabinForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(schemaForm),
    mode: 'onChange',
  });

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('New cabin added');
      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    mutate({ ...data, image: data.image });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Cabin name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register('regularPrice')}
        />
      </FormRow>

      <FormRow labelName="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>

      <FormRow
        labelName="Description for website"
        errorMessage={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          disabled={isCreating}
          {...register('description')}
        />
      </FormRow>

      <FormRow labelName="Cabin photo" errorMessage={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isCreating}
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" $size="medium" type="reset">
          Cancel
        </Button>

        <Button
          $variation="secondary"
          $size="medium"
          disabled={isCreating}
          type="submit"
        >
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
