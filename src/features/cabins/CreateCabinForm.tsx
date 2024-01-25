import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { schemaForm } from '@/constants/schemaForm';
import { createCabin } from '@/services/apiCabins';
import { ICabin } from '@/types/cabin';
import Button from '@/ui/Button/Button';
import FileInput from '@/ui/FileInput/FileInput';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import Textarea from '@/ui/Textarea/Textarea';

const CreateCabinForm = () => {
  const queryClient = useQueryClient();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICabin>({
    resolver: yupResolver(schemaForm),
    mode: 'onChange',
  });

  const onSubmit = (data: ICabin) => {
    mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Cabin name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
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
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        labelName="Description for website"
        errorMessage={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Cabin photo" errorMessage={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isCreating} />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          $size="medium"
          type="reset"
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button $variation="secondary" $size="medium" disabled={isCreating}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
